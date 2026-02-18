import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root Backend directory
// This goes up two levels: config -> src -> Backend
dotenv.config({ path: resolve(__dirname, '../../.env') });

// Debug: Log to verify .env is loaded
console.log('🔧 Environment loaded from:', resolve(__dirname, '../../.env'));
console.log('✅ SMTP_USER:', process.env.SMTP_USER ? 'Loaded' : '❌ Missing');
console.log('✅ EMAIL_LOGO_URL:', process.env.EMAIL_LOGO_URL ? 'Loaded' : '❌ Missing');
console.log('✅ PLAYSTORE_BADGE_URL:', process.env.PLAYSTORE_BADGE_URL ? 'Loaded' : '❌ Missing');
console.log('✅ APPSTORE_BADGE_URL:', process.env.APPSTORE_BADGE_URL ? 'Loaded' : '❌ Missing');