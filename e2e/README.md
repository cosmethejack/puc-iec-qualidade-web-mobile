# 🧪 Seminário Técnico: Qualidade em Aplicações Web e Mobile
**Curso:** Pós-Graduação PUC Minas IEC - Qualidade em Aplicações Web e Mobile  
**Data:** Outubro de 2026  
**Professor:** Jackson Smith Moisés Matias  

---

## 📌 1. Recorte do Projeto
> *"Auditoria automatizada de acessibilidade (WCAG 2.2) e testes de regressão visual no CineFav Web/TodoMVC para identificar e corrigir falhas de interface e inclusão."*

* **Trilha:** Web / Acessibilidade (A11y) + Regressão Visual  
* **Objetivo:** Garantir a conformidade visual e de acessibilidade da interface web utilizando ferramentas 100% gratuitas e sem dependência de serviços pagos.

---

## 🛠️ 2. Ferramentas Utilizadas
* **[Playwright](https://playwright.dev/):** Automação de testes End-to-End e suíte de regressão visual nativa (`toHaveScreenshot`).
* **[@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright):** Motor de auditoria automatizada de acessibilidade baseado nas diretrizes WCAG 2.2 (níveis A e AA).
* **Node.js:** Ambiente de execução para os testes.

---

## 🚀 3. Instruções de Reprodutibilidade (Como Executar)

Siga os passos abaixo para clonar e rodar o projeto na sua máquina local:

### **Pré-requisitos**
* Node.js v18 ou superior instalado.
* Git instalado.

### **Passo a Passo**

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/seminario-qualidade-cinefav.git](https://github.com/SEU_USUARIO/seminario-qualidade-cinefav.git)
   cd seminario-qualidade-cinefav

   Instalar as dependências do projeto:

Bash
npm install
Instalar os navegadores do Playwright:

Bash
npx playwright install
Executar a Auditoria de Acessibilidade (Axe-Core):

Bash
npx playwright test e2e/accessibility.spec.js --headed
Gerar os Screenshots de Referência (Baseline Visual):

Bash
npx playwright test e2e/visual-regression.spec.js --update-snapshots
Executar os Testes de Regressão Visual (Comparação):

Bash
npx playwright test e2e/visual-regression.spec.js
Visualizar o Relatório Gráfico em HTML:

Bash
npx playwright show-report
🤖 4. Declaração do Uso de Inteligência Artificial
Em conformidade com as regras do Seminário Técnico:

Ferramenta de IA Utilizada: ChatGPT / Gemini / Copilot

Como foi aplicada: Auxílio na estruturação inicial dos cenários de teste com AxeBuilder, configuração do ambiente de testes no Playwright e elaboração da documentação técnica de reprodutibilidade.

Compreensão do Grupo: O código gerado foi revisado, executado e validado manualmente pela equipe.

👥 5. Integrantes do Grupo e Contribuições
(Verifique o histórico de commits no repositório para evidência de contribuição individual)

Integrante 1 - [Damiao] @usuario_github)

Integrante 2 - [Alice] (@usuario_github)

Integrante 3 - [Luiz] (@usuario_github)
