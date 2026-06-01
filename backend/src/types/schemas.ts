import { z } from 'zod';

// ------------------------------
// Request Body Schemas
// ------------------------------

export const RunAgentRequestSchema = z.object({
  agentId: z.string().uuid().optional(),
  systemPrompt: z.string().min(1),
  userMessage: z.string().min(1),
  modelEngine: z.string().default('Gemini 1.5 Pro'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).default(8192),
  toolsConfig: z.record(z.any()).default({}),
});

export type RunAgentRequest = z.infer<typeof RunAgentRequestSchema>;

export const CreateAgentRequestSchema = z.object({
  name: z.string().min(1, 'Agent name is required'),
  description: z.string().optional().nullable(),
  system_prompt: z.string().min(1, 'System prompt is required'),
  model_engine: z.string().min(1, 'Model engine is required').default('Gemini 1.5 Pro'),
  temperature: z.number().min(0).max(2).default(0.7),
  max_tokens: z.number().int().min(1).default(8192),
  tools_config: z.record(z.any()).default({}),
  github_sync_url: z.string().optional().nullable(),
});

export type CreateAgentRequest = z.infer<typeof CreateAgentRequestSchema>;

// ------------------------------
// Response Schemas
// ------------------------------

export const RunAgentResponseSchema = z.object({
  success: z.boolean(),
  output: z.string(),
  tokensUsed: z.number().int().min(0),
  latency: z.number().int().min(0),
  agentId: z.string().uuid().optional(),
});

export type RunAgentResponse = z.infer<typeof RunAgentResponseSchema>;

// ------------------------------
// Database Types (for reference)
// ------------------------------

export interface Profile {
  id: string;
  encrypted_gemini_api_key: string | null;
  updated_at: string;
  created_at: string;
}

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  system_prompt: string | null;
  model_engine: string;
  temperature: number;
  max_tokens: number;
  tools_config: Record<string, any>;
  github_sync_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TelemetryLog {
  id: string;
  agent_id: string | null;
  user_id: string;
  tokens_used: number;
  latency_ms: number;
  status: 'success' | 'error';
  executed_tool: string | null;
  created_at: string;
}
