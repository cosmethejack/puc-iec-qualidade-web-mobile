import { test, expect } from '@playwright/test';

test('3. Validação de Regressão Visual - CineFav', async ({ page }) => {
  await page.goto('http://localhost:5174/');
  await page.waitForLoadState('networkidle');

  // Compara a tela atual com a foto baseline salva no disco
  await expect(page).toHaveScreenshot('cinefav-home.png', {
    fullPage: true,
  });
});