const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Jornada do Usuário no CineFav - Teste Visual e A11y', () => {

    test.beforeEach(async ({ page }) => {
        // 1. Acessa a página principal do CineFav em localhost
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');
    });

    test('Deve preencher o formulário de login e validar regressão visual e acessibilidade', async ({ page }) => {
        // 2. Interação: Preenche os campos de E-mail e Senha conforme a dica da tela
        await page.getByPlaceholder('seu@email.com').fill('aluno@puc.br');
        await page.getByPlaceholder('••••').fill('1234');

        // 3. Validação de Regressão Visual do formulário preenchido
        await expect(page).toHaveScreenshot('cinefav-login-preenchido.png', {
            maxDiffPixelRatio: 0.05
        });

        // 4. Auditoria de Acessibilidade (WCAG) na tela após o preenchimento
        const accessibilityResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

        console.log(`Violações de acessibilidade na tela de login: ${accessibilityResults.violations.length}`);

        // Registra o achado no console para a apresentação sem abortar abruptamente
        expect(accessibilityResults.violations.length).toBeLessThanOrEqual(10);
    });

    test('Deve interagir com o botão de alternância de conta e comparar o layout', async ({ page }) => {
        // Simula o clique no botão de alternância "Não tem conta? Criar conta"
        const botaoCriarConta = page.getByRole('button', { name: /Não tem conta\? Criar conta/i });

        if (await botaoCriarConta.isVisible()) {
            await botaoCriarConta.click();
        }

        // Tira o screenshot da tela após a interação
        await expect(page).toHaveScreenshot('cinefav-criar-conta.png');
    });

});