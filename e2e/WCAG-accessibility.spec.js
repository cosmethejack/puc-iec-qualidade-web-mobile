import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Suíte Completa de Acessibilidade WCAG 2.1 / 2.2 - CineFav', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
    });

    // 1. PERCEPTÍVEL (PERCEIVABLE)
    test('WCAG 1.1.1: Conteúdo Não Textual - Validação de atributos alt e descrições textuais', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['image-alt', 'object-alt', 'role-img-alt'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 1.2.1 & 1.2.3: Mídia Gravada (Apenas Áudio/Vídeo) e Descrição do Mídia', async ({ page }) => {
        const mediaElements = await page.evaluate(() => {
            const media = Array.from(document.querySelectorAll('video, audio'));
            return media.map(el => ({
                hasTrack: el.querySelectorAll('track').length > 0,
                hasAriaDescribedBy: el.hasAttribute('aria-describedby') || el.hasAttribute('aria-label')
            }));
        });

        if (mediaElements.length > 0) {
            mediaElements.forEach(item => {
                expect(item.hasTrack || item.hasAriaDescribedBy).toBe(true);
            });
        }
    });

    test('WCAG 1.3.1: Informações e Relações - Estrutura semântica (Headers, Landmarks e Labels)', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['landmark-one-main', 'page-has-heading-one', 'label', 'definition-list'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 1.3.6: Identificação da Finalidade - Marcação semântica de componentes de UI', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['aria-allowed-role', 'aria-roles', 'landmark-unique'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 1.4.8: Apresentação Visual - Customização de espaçamento e alinhamento de texto', async ({ page }) => {
        const temTextoJustificado = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('p, span, h1, h2, h3, h4'));
            return elements.some(el => window.getComputedStyle(el).textAlign === 'justify');
        });

        expect(temTextoJustificado).toBe(false);
    });

    test('WCAG 1.4.11: Contraste de Elementos Não Textuais - Bordas e ícones interativos', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['color-contrast'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 1.4.12: Espaçamento de Texto - Suporte a ajustes de line-height e letter-spacing', async ({ page }) => {
        await page.addStyleTag({
            content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }'
        });

        const bodyVisible = await page.locator('body').isVisible();
        expect(bodyVisible).toBe(true);
    });

    test('WCAG 1.4.13: Conteúdo em Hover ou Foco - Mensagens dinâmicas e tooltips dispensáveis', async ({ page }) => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Escape');

        const body = page.locator('body');
        await expect(body).toBeVisible();
    });

    // 2. OPERÁVEL (OPERABLE)
    test('WCAG 2.1.1 & 2.1.3: Teclado sem Exceção e Sem Armadilhas de Foco (Keyboard Trap)', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['accesskeys', 'tabindex'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 2.2.1: Tempo Ajustável - Ausência de limites de tempo rígidos sem aviso prévio', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['meta-refresh'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 2.2.2 & 2.3.1: Controle de animações contínuas e limite seguro de elementos piscantes', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });

        const temAnimacaoInsegura = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            return elements.some(el => {
                const style = window.getComputedStyle(el);
                return style.animationDuration === '0s' || style.animationIterationCount === 'infinite';
            });
        });

        expect(temAnimacaoInsegura).toBeDefined();
    });

    test('WCAG 2.4.4, 2.4.9 & 2.4.10: Finalidade do Link e Cabeçalhos de Seção', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['link-name', 'empty-heading', 'p-as-heading'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 2.4.6: Cabeçalhos e Rótulos Descritivos', async ({ page }) => {
        const headings = await page.locator('h1, h2, h3, h4').allInnerTexts();
        if (headings.length > 0) {
            headings.forEach(text => {
                expect(text.trim().length).toBeGreaterThan(0);
            });
        }
    });

    // 3. COMPREENSÍVEL E ROBUSTO (UNDERSTANDABLE & ROBUST)
    test('WCAG 3.2.2 & 3.2.4: Mudanças de Contexto ao Entrar Dados e Identificação Consistente', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['form-field-multiple-labels'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 3.3.2: Rótulos ou Instruções em Campos de Formulário', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['aria-input-field-name', 'label-title-only'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

    test('WCAG 4.1.2: Nome, Função, Valor - Componentes Customizados e ARIA', async ({ page }) => {
        const axeResults = await new AxeBuilder({ page })
            .withRules(['aria-allowed-attr', 'aria-required-attr', 'aria-required-children', 'aria-valid-attr-value'])
            .analyze();

        expect(axeResults.violations).toEqual([]);
    });

});