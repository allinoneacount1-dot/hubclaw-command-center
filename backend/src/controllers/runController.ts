import type { Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { supabase, decryptApiKey } from '../config/supabaseClient.js';
import { ENV } from '../config/environment.js';
import {
  RunAgentRequestSchema,
  RunAgentResponse,
  type RunAgentRequest,
} from '../types/schemas.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// Helper: Mock AI response for development
async function getMockAIResponse(userMessage: string): Promise<{
  output: string;
  tokensUsed: number;
  latency: number;
}> {
  const startTime = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    output: `Mock Response: Successfully processed your query "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}". Data analysis complete, found 42 insights!`,
    tokensUsed: Math.floor(Math.random() * 800 + 200),
    latency: Date.now() - startTime,
  };
}

// Helper: Real AI call using Google Gen AI SDK
async function getRealAIResponse(
  apiKey: string,
  request: RunAgentRequest
): Promise<{
  output: string;
  tokensUsed: number;
  latency: number;
}> {
  const startTime = Date.now();

  const genAI = new GoogleGenAI({ apiKey });
  
  const model = request.modelEngine.toLowerCase().includes('flash')
    ? 'gemini-1.5-flash'
    : 'gemini-1.5-pro';

  const prompt = `${request.systemPrompt}\n\nUser: ${request.userMessage}`;
  
  const result = await genAI.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: request.temperature,
      maxOutputTokens: request.maxTokens,
    },
  });

  const responseText = result.text;
  const usage = result.usageMetadata;
  const totalTokens = (usage?.promptTokenCount || 0) + (usage?.candidatesTokenCount || 0);

  return {
    output: responseText,
    tokensUsed: totalTokens,
    latency: Date.now() - startTime,
  };
}

// Controller: POST /api/run
export async function runAgent(req: AuthRequest, res: Response) {
  const startTime = Date.now();
  let logStatus: 'success' | 'error' = 'error';
  let tokensUsedTotal = 0;
  let latencyMs = 0;
  let executedTool = null;

  try {
    // 1. Validate request
    const validationResult = RunAgentRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        error: 'Invalid agent data',
        details: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const runRequest = validationResult.data;

    // 2. Authenticate user
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }

    // 3. Fetch user's API key from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('encrypted_gemini_api_key')
      .eq('id', userId)
      .single();

    if (profileError || !profile?.encrypted_gemini_api_key) {
      if (!ENV.MOCK_AI) {
        res.status(400).json({
          success: false,
          error: 'Gemini API key not found in your profile. Please configure your API key first.',
        });
        return;
      }
    }

    // 4. Execute AI
    let aiResult;

    if (ENV.MOCK_AI) {
      console.log('Using MOCK_AI = true — simulating AI response');
      aiResult = await getMockAIResponse(runRequest.userMessage);
      executedTool = 'Mock AI Executor';
    } else {
      console.log('Using real Gemini AI — calling API');
      const userApiKey = decryptApiKey(profile!.encrypted_gemini_api_key);
      aiResult = await getRealAIResponse(userApiKey, runRequest);
      executedTool = 'Gemini AI Executor';
    }

    logStatus = 'success';
    tokensUsedTotal = aiResult.tokensUsed;
    latencyMs = aiResult.latency;

    // 5. Prepare response
    const response: RunAgentResponse = {
      success: true,
      output: aiResult.output,
      tokensUsed: aiResult.tokensUsed,
      latency: aiResult.latency,
      agentId: runRequest.agentId,
    };

    // Send response to frontend
    res.json(response);

    // 6. Log telemetry asynchronously
    try {
      await supabase.from('telemetry_logs').insert({
        agent_id: runRequest.agentId || null,
        user_id: userId,
        tokens_used: tokensUsedTotal,
        latency_ms: latencyMs,
        status: logStatus,
        executed_tool: executedTool,
      });
      console.log('Telemetry log saved');
    } catch (telemetryError) {
      console.error('Failed to save telemetry log:', telemetryError);
    }
  } catch (error) {
    console.error('Error running agent:', error);

    // Send error response
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run agent',
      });
    }

    // Log error telemetry asynchronously
    try {
      const userId = req.user?.id;
      const runRequest = req.body as Partial<RunAgentRequest>;
      await supabase.from('telemetry_logs').insert({
        agent_id: runRequest.agentId || null,
        user_id: userId,
        tokens_used: tokensUsedTotal,
        latency_ms: Date.now() - startTime,
        status: 'error',
        executed_tool: executedTool,
      });
    } catch (telemetryError) {
      console.error('Failed to save error telemetry log:', telemetryError);
    }
  }
}
