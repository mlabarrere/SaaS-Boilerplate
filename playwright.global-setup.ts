import dotenv from 'dotenv';

async function globalSetup() {
  dotenv.config({ path: '.env.local', override: true });
}

export default globalSetup;
