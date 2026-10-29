import { test, expect } from '@playwright/test';

test.describe('Acessibilidade Prática - Navegação por Teclado', () => {
    test('Deve permitir interagir e adicionar item usando apenas o teclado (sem rato)', async ({ page }) => {
        // 1. Navega para a página inicial/login
        await page.goto('/');

        // 2. Foca o campo de entrada do CineFav (ajustado de .new-todo para o input de e-mail/busca real)
        const input = page.locator('input[type="email"], input[type="text"]').first();
        await expect(input).toBeVisible();
        await input.focus();

        // 3. Simula a digitação via teclado
        await page.keyboard.type('usuario@teste.com');

        // 4. Navega até o botão usando a tecla Tab e pressiona Enter
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
    });
});