import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { supabase } from '../config/supabaseClient.js';
import { CreateAgentRequestSchema, type CreateAgentRequest } from '../types/schemas.js';

interface Agent {
  id?: string;
  user_id?: string;
  name: string;
  description: string | null;
  system_prompt: string | null;
  model_engine: string;
  temperature: number;
  max_tokens: number;
  tools_config: Record<string, any>;
  github_sync_url?: string | null;
  created_at?: string;
}

export async function getAgents(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    let query = supabase.from('agents').select('*');

    // If user is logged in, show public + their own agents; otherwise only public
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ agents: data });
  } catch (error) {
    console.error('Error getting agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
}

export async function createAgent(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Validate the incoming request body with Zod
    const validationResult = CreateAgentRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        error: 'Invalid agent data',
        details: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const validatedData: CreateAgentRequest = validationResult.data;

    const agentData: Agent = {
      user_id: userId,
      name: validatedData.name,
      description: validatedData.description || null,
      system_prompt: validatedData.system_prompt,
      model_engine: validatedData.model_engine,
      temperature: validatedData.temperature,
      max_tokens: validatedData.max_tokens,
      tools_config: validatedData.tools_config || {},
      github_sync_url: validatedData.github_sync_url || null,
    };

    const { data, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ agent: data });
  } catch (error) {
    console.error('Error creating agent:', error);
    res.status(500).json({ error: 'Failed to create agent' });
  }
}

export async function getAgentById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    let query = supabase.from('agents').select('*').eq('id', id);

    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }
      throw error;
    }

    res.json({ agent: data });
  } catch (error) {
    console.error('Error getting agent:', error);
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
}
