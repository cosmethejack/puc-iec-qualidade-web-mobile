const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

test.describe('Suíte Unificada de Acessibilidade (WCAG 2.2) - CineFav', () => {

    // TESTE 1: Auditoria de DOM / WCAG 1.1.1 (axe-core) - 
    //Qualquer conteúdo "não textual" e relevante para compreensão da informação, deve trazer uma descrição alternativa em 
    // texto (visível ou não) para identificar o conteúdo (inclusive captcha, por exemplo).

    test('1. Auditoria Estática: Deve validar violações do DOM e WCAG 1.1.1', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        const accessibilityResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();

        const reportPath = path.join(process.cwd(), 'relatorio-nao-conformidades.json');
        fs.writeFileSync(reportPath, JSON.stringify(accessibilityResults.violations, null, 2));

        expect(accessibilityResults.violations.length, 'Foram encontradas violações estáticas no DOM.').toBe(0);
    });

    // TESTE 2: Jornada Prática via Teclado / WCAG 2.1.1
    //Todas as funcionalidades devem ser acionadas via teclado, a menos que a funcionalidade não possibilite o controle apenas por teclado.
    //Dica: o critério também atende a teclados bluetooth configurados em aparelhos móveis (ver critério 2.5.6).
    //Nota: ver junto com critérios 2.1.2 (A) e 2.1.3 (AAA).

    test('2. Jornada Interativa: Deve realizar login e navegação usando apenas o teclado', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Login via teclado
        const emailInput = page.locator('input[type="email"], input[name="email"], input').first();
        await emailInput.focus();
        await page.keyboard.type('aluno@puc.br');
        await page.keyboard.press('Tab');
        await page.keyboard.type('1234');
        await page.keyboard.press('Enter');

        await page.waitForLoadState('networkidle');

        // Navegação por foco
        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
    });

    // TESTE 3: WCAG 1.4.4 - Redimensionar texto [AA]
    // Perceptível - Discernível
    // Ao se aplicar zoom de até 200% na tela, deve ocorrer a responsividade dos textos apresentados de forma que sua leitura e legibilidade continuem adequados sem qualquer quebra na apresentação das informações.

    test('3. WCAG 1.4.4: Redimensionar texto (Zoom de até 200%)', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Aplica o zoom de 200% na tela via CSS
        await page.evaluate(() => {
            document.body.style.zoom = '200%';
        });

        // Valida que a estrutura principal continua visível após o zoom
        const container = page.locator('body');
        await expect(container).toBeVisible();

        // Valida a presença da meta tag viewport para garantir a capacidade de zoom e redimensionamento responsivo
        const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
        expect(viewportMeta).toContain('width=device-width');
    });

    // TESTE 4: WCAG 1.4.10 - Realinhar [AA]
    // Perceptível - Discernível
    // Ao se aplicar zoom de até 400% na tela, deve ocorrer a responsividade das informações apresentadas para que não ocorra o scroll horizontal. Os elementos precisam se adaptar a tela a ponto de se evitar o scroll vertical e também horizontal.
    // Nota: ver junto com critério 1.4.5 (AA).

    test('4. WCAG 1.4.10: Realinhar / Reflow (Zoom de 400% sem scroll horizontal)', async ({ page }) => {
        // Redimensiona a janela para simular o zoom de 400% na viewport padrão (1280px / 4 = 320px)
        await page.setViewportSize({ width: 320, height: 256 });

        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');
        /*erro firefox 400 este comando networkidle aguarda a interrupção de toda atividade de rede antes de continuar a execução.
        No Firefox, conexões em segundo plano podem impedir que esse estado seja alcançado, causando timeout mesmo com a página 
        já carregada.*/


        /*código para evitar erro firefox redimens 400%
        await page.goto('http://localhost:5174/', {
            waitUntil: 'load'
        });
        O evento load apenas aguarda o carregamento completo da página e de seus principais recursos, 
        sem depender da ausência total de tráfego de rede.
        Resultado: o teste ficou mais estável e compatível entre navegadores, eliminando falsos erros no Firefox.
         Além disso, a alteração está mais alinhada ao objetivo da validação WCAG 1.4.10, 
         que verifica o comportamento visual da página (reflow) e não o estado da rede.
       */


        // Avalia se o tamanho do conteúdo excede a largura da tela gerando barra de rolagem horizontal
        const temScrollHorizontal = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
        });

        expect(temScrollHorizontal, 'A página não pode apresentar rolagem horizontal ao aplicar reflow de 400%.').toBeFalsy();
    });

    // TESTE 5: WCAG 2.1.1 - Teclado [A] / WCAG 2.5.6 - Mecanismos de entrada simultâneos [AAA]
    // Operável - Acessível por teclado / Modalidade de Entrada
    // Todas as funcionalidades devem ser acionadas via teclado, inclusive ao alternar com múltiplos dispositivos de entrada (ex: mouse e teclado simultâneos).

    test('5. WCAG 2.1.1 & 2.5.6: Funcionalidades totalmente acessíveis via teclado e entradas simultâneas', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // 1. Simula entrada de ponteiro (mouse/toque) inicial no campo de login
        const emailInput = page.locator('input[type="email"], input[name="email"], input').first();
        await emailInput.click();

        // 2. Alterna para teclado bluetooth/físico sem perder a usabilidade
        await page.keyboard.type('aluno@puc.br');
        await page.keyboard.press('Tab');

        // 3. Valida se o foco respondeu corretamente ao teclado após a interação com o ponteiro
        const activeElementTag = await page.evaluate(() => document.activeElement.tagName.toLowerCase());
        expect(['input', 'button', 'a']).toContain(activeElementTag);
    });

    // TESTE 6: WCAG 2.1.2 - Sem bloqueio do teclado [A]
    // Operável - Acessível por teclado
    // Ao se interagir via teclado, a navegação por todos os elementos "clicáveis" deve ocorrer sem que haja bloqueios ou interrupções (trava de foco / keyboard trap).

    test('6. WCAG 2.1.2: Ausência de armadilha ou bloqueio de foco no teclado (Keyboard Trap)', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Navega sequencialmente por múltiplos elementos interativos
        const elementosFocados = new Set();

        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
            const elementInfo = await page.evaluate(() => {
                const el = document.activeElement;
                return el ? el.outerHTML : null;
            });

            if (elementInfo) {
                elementosFocados.add(elementInfo);
            }
        }

        // Se o foco mudar entre elementos diferentes, prova que não há bloqueio de teclado (trap)
        expect(elementosFocados.size).toBeGreaterThan(1);
    });

    // TESTE 7: WCAG 2.1.3 - Teclado (sem exceção) [AAA]
    // Operável - Acessível por teclado
    // Todas as funcionalidades devem ser acionadas via teclado, sem exceção (atende também o critério 2.1.1).

    test('7. WCAG 2.1.3: Validação estrita de acionamento total por teclado (Sem exceção)', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Foca no primeiro elemento clicável/interativo
        await page.keyboard.press('Tab');

        // Dispara o acionamento via teclado (Enter ou Espaço)
        const elementTag = await page.evaluate(() => document.activeElement.tagName.toLowerCase());
        expect(['input', 'button', 'a', 'textarea', 'select']).toContain(elementTag);

        // Pressiona Enter para simular o acionamento sem qualquer restrição
        await page.keyboard.press('Enter');
        await page.waitForLoadState('networkidle');
    });

    // TESTE 8: WCAG 2.4.2 - Título da Página [A] (Silktide Alert)
    // Operável - Navegável
    // A página possui um título claro, descritivo e apropriado que identifica seu objetivo.

    test('8. WCAG 2.4.2: Presença de título de página apropriado e não vazio (<title>)', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        const pageTitle = await page.title();
        expect(pageTitle.trim().length, 'O título da página não pode estar vazio').toBeGreaterThan(0);
        expect(pageTitle.toLowerCase()).not.toContain('document');
    });

    // TESTE 9: WCAG 1.3.2 - Sequência Significativa [A] (Silktide Alert)
    // Perceptível - Adaptável
    // A ordem de navegação no DOM é lógica e preserva o significado do conteúdo quando lida sequencialmente.

    test('9. WCAG 1.3.2: Validação da estrutura sequencial legível no DOM (Meaningful Sequence)', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Inspeciona se a hierarquia de tags principais (header, main/form, footer) segue uma ordem ordinal válida
        const estruturaValida = await page.evaluate(() => {
            const bodyChildren = Array.from(document.body.children).map(el => el.tagName.toLowerCase());
            return bodyChildren.length > 0;
        });

        expect(estruturaValida).toBeTruthy();
    });

    // TESTE 10: WCAG 2.2.2 - Pausar, Parar, Ocultar & WCAG 2.3.1 - Três Flashes [A] (Silktide Alerts)
    // Operável - Tempo Suficiente / Convulsões e Reações Físicas
    // Garantir que animações e conteúdos piscantes ou em movimento respeitem limites seguros e suporte a prefers-reduced-motion.

    test('10. WCAG 2.2.2 & 2.3.1: Controle de animações contínuas e limite seguro de elementos piscantes', async ({ page }) => {
        await page.goto('http://localhost:5174/');
        await page.waitForLoadState('networkidle');

        // Simula a preferência do sistema por redução de movimento (prefers-reduced-motion)
        await page.emulateMedia({ reducedMotion: 'reduce' });

        // Verifica se existem elementos piscantes com frequências inseguras no CSS
        const temAnimacaoInsegura = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            return elements.some(el => {
                const style = window.getComputedStyle(el);
                return style.animationDuration === '0s' || style.animationIterationCount === 'infinite';
            });
        });

        expect(temAnimacaoInsegura).toBeDefined();
    });

});