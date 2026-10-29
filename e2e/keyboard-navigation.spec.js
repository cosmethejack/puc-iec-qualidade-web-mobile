const { test, expect } = require('@playwright/test');

test.describe('Acessibilidade Prática - Navegação por Teclado', () => {

    test('Deve permitir login usando apenas teclado', async ({ page }) => {

        await page.goto('http://localhost:5174/', {
            waitUntil: 'load'
        });

        const email = page.getByRole('textbox', { name: 'E-mail' });

        await email.focus();

        await page.keyboard.type('aluno@puc.br');
        await page.keyboard.press('Tab');

        await page.keyboard.type('1234');
        await page.keyboard.press('Tab');

        await page.keyboard.press('Enter');

    });

});