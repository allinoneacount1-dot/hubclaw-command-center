import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  SUPABASE: {
    URL: process.env.SUPABASE_URL || '',
    ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  JWT_SECRET: process.env.JWT_SECRET || '',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
  MOCK_AI: process.env.MOCK_AI === 'true',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
} as const;

export function validateEnv() {
  const required = [
    { key: 'SUPABASE_URL', value: ENV.SUPABASE.URL },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', value: ENV.SUPABASE.SERVICE_ROLE_KEY },
    { key: 'SUPABASE_ANON_KEY', value: ENV.SUPABASE.ANON_KEY },
    { key: 'JWT_SECRET', value: ENV.JWT_SECRET },
    { key: 'ENCRYPTION_KEY', value: ENV.ENCRYPTION_KEY },
  ];

  const missing = required.filter(r => !r.value).map(r => r.key);

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}
