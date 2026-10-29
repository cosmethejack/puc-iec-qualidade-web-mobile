const { test, expect } = require('@playwright/test');

test.describe('Acessibilidade Prática - Navegação por Teclado', () => {

    test('Deve permitir interagir e adicionar item usando apenas o teclado (sem rato)', async ({ page }) => {
        await page.goto('http://localhost:5174/');

        // 1. Foca o campo de entrada via teclado
        const input = page.locator('.new-todo');
        await input.focus();

        // 2. Simula a digitação e a tecla Enter para submeter
        await page.keyboard.type('Testando acessibilidade via teclado');
        await page.keyboard.press('Enter');

        // 3. Valida que o item foi adicionado com sucesso
        const itemAdicionado = page.locator('.todo-list label');
        await expect(itemAdicionado).toHaveText('Testando acessibilidade via teclado');
    });

});