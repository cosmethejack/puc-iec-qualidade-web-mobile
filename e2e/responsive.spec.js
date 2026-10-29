const { test, expect } = require('@playwright/test');

test.describe('Validação de Layout Desktop - CineFav', () => {

    test('Deve validar o layout em tela Desktop Full HD (1080p)', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('cinefav-layout-desktop-1080p.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05
        });
    });

    test('Deve validar o layout em tela Notebook HD (720p)', async ({ page }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('cinefav-layout-desktop-720p.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05
        });
    });

});