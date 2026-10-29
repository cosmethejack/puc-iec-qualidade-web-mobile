import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('2. Demonstração de Correção - Injetando Alto Contraste', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.waitForLoadState('networkidle');

    // Injeta o CSS de alto contraste
    await page.addStyleTag({
        content: `
      h1, h2, h3 { color: #730000 !important; } 
      p, label, span { color: #1a1a1a !important; } 
      button { background-color: #730000 !important; color: #ffffff !important; }
    `
    });

    // Re-audita a página após a correção
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze();

    console.log(`🟢 Violações após a correção: ${results.violations.length}\n`);

    // Confirma que as falhas de contraste zeraram
    const contrastFailures = results.violations.filter(v => v.id === 'color-contrast');
    expect(contrastFailures.length).toBe(0);
});