import { FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  // Setup global se necessário
  console.log('Global setup executado');
}

export default globalSetup;
