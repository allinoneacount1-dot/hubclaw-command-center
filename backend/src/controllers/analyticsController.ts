import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { supabase } from '../config/supabaseClient.js';

export async function getAgentAnalytics(req: AuthRequest, res: Response) {
  try {
    const { agentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Get all logs for this agent and user
    const { data: logs, error: logsError } = await supabase
      .from('telemetry_logs')
      .select('*')
      .eq('agent_id', agentId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (logsError) throw logsError;

    // Calculate daily token consumption
    const dailyTokens = logs.reduce((acc: Record<string, number>, log) => {
      const date = log.created_at?.split('T')[0] || 'unknown';
      acc[date] = (acc[date] || 0) + (log.tokens_used || 0);
      return acc;
    }, {});

    const tokenSeries = Object.entries(dailyTokens).map(([date, tokens]) => ({
      date,
      tokens,
    })).sort((a, b) => a.date.localeCompare(b.date));

    // Calculate average latency
    const avgLatency = logs.length > 0
      ? logs.reduce((sum, log) => sum + (log.latency_ms || 0), 0) / logs.length
      : 0;

    const latencyByTool = logs.reduce((acc: Record<string, number[]>, log) => {
      const tool = log.executed_tool || 'unknown';
      if (!acc[tool]) acc[tool] = [];
      if (log.latency_ms) acc[tool].push(log.latency_ms);
      return acc;
    }, {});

    const latencySeries = Object.entries(latencyByTool).map(([tool, latencies]) => ({
      tool,
      avgMs: latencies.length > 0
        ? latencies.reduce((a, b) => a + b, 0) / latencies.length
        : 0,
    }));

    // Recent log strings
    const recentLogs = logs.slice(0, 10).map(log => {
      const prefix = log.status === 'success' ? '[SUCCESS]' :
                     log.status === 'error' ? '[ERROR]' : '[INFO]';
      return `${prefix} ${log.executed_tool || 'Agent'} executed in ${log.latency_ms}ms`;
    });

    res.json({
      analytics: {
        tokenSeries,
        latencySeries,
        recentLogs,
        totalExecutions: logs.length,
        averageLatency: Math.round(avgLatency),
        totalTokensUsed: logs.reduce((sum, log) => sum + (log.tokens_used || 0), 0),
      },
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}
