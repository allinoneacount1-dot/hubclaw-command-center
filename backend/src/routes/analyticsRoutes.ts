import { Router } from 'express';
import { getAgentAnalytics } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:agentId', authMiddleware, getAgentAnalytics);

export default router;
