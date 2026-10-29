import { test, expect } from '@playwright/test';

test('Validação de Regressão Visual - CineFav', async ({ page }) => {
    // 1. Navega para a URL local da aplicação CineFav
    await page.goto('http://localhost:5174/');

    // 2. Aguarda o carregamento do elemento principal ou da página inteira
    await page.waitForLoadState('networkidle');

    // 3. Captura o screenshot da página e compara com a baseline
    await expect(page).toHaveScreenshot('cinefav-home.png', {
        fullPage: true, // Garante que tira print da tela completa
    });
});