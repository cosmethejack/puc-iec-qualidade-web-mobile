// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* Executa os testes em paralelo */
  fullyParallel: true,
  /* Falha no CI se houver test.only acidental */
  forbidOnly: !!process.env.CI,
  /* Tenta novamente em caso de falha no CI */
  retries: process.env.CI ? 2 : 0,
  /* Limita a 1 worker no CI para evitar gargalos de CPU na máquina do GitHub */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter HTML */
  reporter: 'html',

  use: {
    /* Define a URL base para se conectar ao IP do container */
    baseURL: 'http://127.0.0.1:5174',

    /* Coleta de rastros em falhas */
    trace: 'on-first-retry',
  },

  /* Configuração dos navegadores para execução */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});