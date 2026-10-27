# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. Fragmento
A leitura passou de imperativa (passo a passo de preenchimento) para declarativa (história do usuário: "faz login e favorita X"). Se a tela ou a regra de login mudar, ajustamos apenas o arquivo _fragments/login.yaml em um único lugar, sem precisar alterar dezenas de testes que dependem do login.

2. Fragmento × POM
O _fragments/login.yaml encapsula uma ação completa e reutilizável (o fluxo de logar), enquanto o elements/login.js armazena apenas o mapeamento dos seletores/IDs da interface. Usa-se o Page Object (.js) para centralizar os seletores da tela e o Fragmento (.yaml) para reutilizar cenários/passos de testes recorrentes.

3. Fragmento parametrizado
Reutilizar o buscar.yaml passando o parâmetro TERM elimina a duplicação de código (princípio DRY). Se a forma como a busca é realizada no app mudar no futuro, alteramos a lógica do fragmento uma única vez em vez de dar manutenção em múltiplos testes copiados.

4. Um limite
Essa arquitetura não ajuda em fluxos dinâmicos com regras de negócio muito complexas, condicionais (if/else) ou validações de dados complexas em tempo de execução. Nesses cenários, a abstração em YAML/JS simples do Maestro pode criar dependências ocultas e dificultar o depuramento (debug) quando uma falha ocorre no meio de fragmentos aninhados.