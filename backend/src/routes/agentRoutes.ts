import { Router } from 'express';
import { getAgents, createAgent, getAgentById } from '../controllers/agentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', authMiddleware, createAgent);

export default router;
