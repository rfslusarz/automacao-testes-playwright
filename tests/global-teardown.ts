import { FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  // Teardown global se necessário
  console.log('Global teardown executado');
}

export default globalTeardown;
