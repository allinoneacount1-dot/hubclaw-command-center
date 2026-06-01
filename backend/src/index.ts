import app from './app.js';
import { ENV, validateEnv } from './config/environment.js';

validateEnv();

const PORT = ENV.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 HubClaw API server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${ENV.NODE_ENV}`);
  console.log(`✅ CORS origin: ${ENV.CORS_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 SIGTERM received: shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📤 SIGINT received: shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
