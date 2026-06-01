import { createClient } from '@supabase/supabase-js';
import { ENV } from './environment.js';
import crypto from 'node:crypto';

export const supabase = createClient(
  ENV.SUPABASE.URL,
  ENV.SUPABASE.SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Helper: Derive a 32-byte key from ENCRYPTION_KEY using SHA-256
function getEncryptionKey(): Buffer {
  return crypto.createHash('sha256').update(ENV.ENCRYPTION_KEY).digest();
}

// Encrypt API key using AES-256-GCM
export function encryptApiKey(apiKey: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 12 bytes is recommended for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(apiKey, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag().toString('base64');
  // Combine IV, auth tag, and encrypted data for storage
  return `${iv.toString('base64')}:${authTag}:${encrypted}`;
}

// Decrypt API key
export function decryptApiKey(encryptedData: string): string {
  const key = getEncryptionKey();
  const [ivStr, authTagStr, encryptedStr] = encryptedData.split(':');

  if (!ivStr || !authTagStr || !encryptedStr) {
    throw new Error('Invalid encrypted data format');
  }

  const iv = Buffer.from(ivStr, 'base64');
  const authTag = Buffer.from(authTagStr, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedStr, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
