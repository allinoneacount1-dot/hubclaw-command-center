import { Router } from 'express';
import { runAgent } from '../controllers/runController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// POST /api/run
router.post('/', authMiddleware, runAgent);

export default router;
