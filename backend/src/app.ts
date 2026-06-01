import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/environment.js';
import agentRoutes from './routes/agentRoutes.js';
import runRoutes from './routes/runRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();

// ------------------------------
// Security & Middleware
// ------------------------------
app.use(helmet());
app.use(morgan(ENV.NODE_ENV === 'development' ? 'dev' : 'combined'));

// CORS Configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (ENV.NODE_ENV === 'development') {
      // Allow localhost in development
      if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
        return;
      }
    }

    if (origin === ENV.CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ------------------------------
// Health Check
// ------------------------------
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV,
  });
});

// ------------------------------
// API Routes
// ------------------------------
app.use('/api/agents', agentRoutes);
app.use('/api/run', runRoutes);
app.use('/api/analytics', analyticsRoutes);

// ------------------------------
// Global Error Handler
// ------------------------------
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(ENV.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 Handler
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

export default app;
