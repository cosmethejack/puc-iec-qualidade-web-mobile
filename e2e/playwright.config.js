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
  /* Limita workers no CI para evitar sobrecarga no container */
  workers: process.env.CI ? 1 : undefined,
  /* Gera relatório HTML */
  reporter: 'html',

  use: {
    /* Define a URL base alinhada com a porta 5174 */
    baseURL: 'http://127.0.0.1:5174',

    /* Coleta trace em caso de falha */
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