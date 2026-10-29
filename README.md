# CineFav - Seminário de Qualidade em Aplicações Web e Mobile
**Curso:** Pós-Graduação PUC Minas IEC - Qualidade em Aplicações Web e Mobile  
**Data:** Outubro de 2026  
**Professor:** Jackson Smith Moisés Matias  


## Sobre o Projeto

O CineFav é uma aplicação web utilizada como objeto de estudo para validação de qualidade de software, acessibilidade digital e experiência do usuário.

O projeto foi desenvolvido com foco na aplicação prática de conceitos de Qualidade de Software, Acessibilidade Web (WCAG 2.2), Automação de Testes, Regressão Visual, Navegação por Teclado, Testes Cross Browser e Responsividade.

---

# Objetivos do Projeto

- Validar requisitos de acessibilidade conforme a WCAG 2.2.
- Identificar falhas de usabilidade relacionadas a teclado.
- Garantir compatibilidade entre navegadores.
- Detectar regressões visuais automaticamente.
- Avaliar comportamento responsivo da interface.
- Produzir evidências automatizadas de qualidade.

---

# Tecnologias Utilizadas

## Aplicação
- HTML5
- CSS3
- JavaScript
- Vite

## Automação
- Playwright
- Axe Core
- Axe Playwright
- Axe HTML Reporter

## Navegadores Validados
- Chromium
- Firefox
- WebKit

---

# Critérios WCAG Avaliados

| Critério | Descrição | Nível |
|-----------|------------|--------|
| WCAG 1.1.1 | Conteúdo Não Textual | A |
| WCAG 1.3.2 | Sequência Significativa | A |
| WCAG 1.4.4 | Redimensionar Texto | AA |
| WCAG 1.4.10 | Reflow | AA |
| WCAG 2.1.1 | Teclado | A |
| WCAG 2.1.2 | Sem Armadilha de Teclado | A |
| WCAG 2.1.3 | Teclado (Sem Exceções) | AAA |
| WCAG 2.2.2 | Pausar, Parar e Ocultar | A |
| WCAG 2.3.1 | Três Flashes ou Abaixo do Limite | A |
| WCAG 2.4.2 | Página com Título | A |
| WCAG 2.5.6 | Mecanismos de Entrada Simultâneos | AAA |

---

# Matriz de Rastreabilidade WCAG

## Referências Oficiais

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/WCAG22/quickref/

### Rastreabilidade dos Testes

| Teste | Critério | Nível |
|---------|----------|--------|
| Teste 1 | WCAG 1.1.1 | A |
| Teste 2 | WCAG 2.1.1 | A |
| Teste 3 | WCAG 1.4.4 | AA |
| Teste 4 | WCAG 1.4.10 | AA |
| Teste 5 | WCAG 2.1.1 | A |
| Teste 5 | WCAG 2.5.6 | AAA |
| Teste 6 | WCAG 2.1.2 | A |
| Teste 7 | WCAG 2.1.3 | AAA |
| Teste 8 | WCAG 2.4.2 | A |
| Teste 9 | WCAG 1.3.2 | A |
| Teste 10 | WCAG 2.2.2 | A |
| Teste 10 | WCAG 2.3.1 | A |

---

# Resumo Executivo da Cobertura

| Indicador | Quantidade |
|------------|------------|
| Critérios WCAG distintos avaliados | 11 |
| Critérios Nível A | 7 |
| Critérios Nível AA | 2 |
| Critérios Nível AAA | 2 |
| Critérios do Princípio Perceptível | 4 |
| Critérios do Princípio Operável | 7 |
| Critérios do Princípio Compreensível | 0 |
| Critérios do Princípio Robusto | 0 (sem validação direta) |
| Navegadores Testados | 3 |

---

# Execução #
**Clonar o repositório:**

   git clone [https://github.com/SEU_USUARIO/seminario-qualidade-cinefav.git](https://github.com/SEU_USUARIO/seminario-qualidade-cinefav.git)

---

# Pré requisitos  #
* Node.js v18 ou superior instalado.
* Git instalado.


```bash
npm install
```

## Executar Aplicação

```bash
npm run dev
```

## Executar Testes

```bash
npx playwright test
```

### Chromium

```bash
npx playwright test --project=chromium
```

### Firefox

```bash
npx playwright test --project=firefox
```

### WebKit

```bash
npx playwright test --project=webkit
```
 nom
---

# Conclusão

O projeto demonstrou a aplicação prática de testes de acessibilidade, responsividade, regressão visual e navegação por teclado utilizando Playwright e axe-core.

Foram implementadas validações relacionadas a 11 critérios da WCAG 2.2, distribuídos entre os princípios Perceptível e Operável, contemplando os níveis A, AA e AAA. As execuções foram realizadas em Chromium, Firefox e WebKit.

Os resultados demonstram que a automação de testes de acessibilidade é uma estratégia eficiente para identificar não conformidades, reduzir riscos de regressão e apoiar o desenvolvimento de aplicações mais inclusivas.

---

# Disciplina

Qualidade em Aplicações Web e Mobile

PUC Minas

---

# Licença

Projeto desenvolvido para fins acadêmicos e educacionais.

# 🧪 Seminário Técnico: Qualidade em Aplicações Web e Mobile

---

## 📌 1. Recorte do Projeto
> *"Auditoria automatizada de acessibilidade (WCAG 2.2), testes de regressão visual, responsividade e navegabilidade via teclado na aplicação web CineFav/TodoMVC."*

* **Trilha:** Web / Acessibilidade (A11y) + Regressão Visual  
* **Objetivo:** Garantir a conformidade visual, inclusão e navegabilidade de interface utilizando ferramentas 100% gratuitas e executadas em ambiente local.

---

## 🛠️ 2. Ferramentas Utilizadas
* **[Playwright](https://playwright.dev/):** Automação de testes End-to-End, navegabilidade via teclado e regressão visual nativa (`toHaveScreenshot`).
* **[@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright):** Motor de auditoria automatizada de acessibilidade (WCAG 2.2).
* **[axe-html-reporter](https://www.npmjs.com/package/axe-html-reporter):** Gerador de relatórios visuais HTML para auditorias de acessibilidade.
* **Node.js:** Ambiente de execução.

---

## 🚀 3. Instruções de Reprodutibilidade (Como Executar)





   cd seminario-qualidade-cinefav
   Integrante 1 - [Damiao] @usuario_github)
   
   Integrante 2 - [Alice] (@usuario_github)
   
   Integrante 3 - [Luiz] (@usuario_github)
