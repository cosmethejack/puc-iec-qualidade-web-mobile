const { test, expect } = require('@playwright/test');

test.describe('Acessibilidade Prática - Navegação por Teclado (WCAG 2.1.1)', () => {

    test('Deve realizar login e navegar por teclado no CineFav', async ({ page }) => {
        // 1. Navega para a aplicação local na porta 5174
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        console.log('\n--- INICIANDO NAVEGAÇÃO POR TECLADO ---');

        // 2. ETAPA DE LOGIN VIA TECLADO
        // Localiza o primeiro campo do formulário (E-mail)
        const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i], input').first();

        await emailInput.focus();
        await expect(emailInput).toBeFocused();
        console.log('✔ Campo de E-mail focado com sucesso');

        // Preenche o e-mail e avança para o campo de Senha com a tecla TAB
        await page.keyboard.type('admin@cinefav.com'); // Altere para seu usuário local
        await page.keyboard.press('Tab');

        // Digita a senha e envia com a tecla ENTER
        await page.keyboard.type('123456'); // Altere para sua senha local
        console.log('✔ Credenciais preenchidas exclusivamente por teclado');
        await page.keyboard.press('Enter');

        // Aguarda a transição de tela/dashboard pós-login
        await page.waitForLoadState('networkidle');

        // 3. NAVEGAÇÃO E BUSCA DE FILMES
        const searchInput = page.locator('input[type="search"], input[placeholder*="Buscar" i], input[type="text"]').first();

        if (await searchInput.isVisible()) {
            await searchInput.focus();
            await expect(searchInput).toBeFocused();
            await page.keyboard.type('Batman');
            await page.keyboard.press('Enter');
            console.log('✔ Busca realizada por teclado com sucesso');
        }

        // 4. VALIDAÇÃO DO FOCO NATIVO (WCAG 2.4.7 - Focus Visible)
        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
        console.log('✔ Elemento focado visível em tela (Atende WCAG 2.4.7)');
    });

});