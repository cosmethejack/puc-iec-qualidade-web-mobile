import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,

  // ⏱️ Aumenta o tempo limite de cada teste de 30s para 60s
  // (Evita o estouro de tempo limite/timeout ao carregar o CineFav no Firefox)
  timeout: 60000,

  use: {
    baseURL: 'http://localhost:5174/',
    trace: 'on-first-retry',
  },

  // Subida automática da aplicação CineFav antes dos testes
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5174/',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  projects: [
    {
      name: 'Desktop Chrome',
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