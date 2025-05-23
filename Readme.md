# Desafio-tecnico-QA

## Aqui compartilharei o passo a passo para execução dos testes do desafio QA.

### Etapa 1 : Desenvolvimento dos testes - Modo Step By Step
Todos os testes da primeira etapa foram definidos com base na página de login do sistema Serverest:  
🔗 https://front.serverest.dev/login

  A base de dados é limpa diariamente, então os testes consideram esse comportamento,
todos os testes foram feitos avaliando a usabilidade e comportamentos esperados pela interface.


### 🔹 Cenário 1 – Login com sucesso

- *Condição de Teste:* Usuário válido já cadastrado no sistema.
- *Pré-Condição:* Acesso ao site de login.
- *Passo a Passo:*
  - Acessar https://front.serverest.dev/login
  - Inserir e-mail e senha válidos
  - Clicar no botão "Login"
- *Resultado Esperado:* Usuário deve ser redirecionado para a página inicial do sistema de compras.
- *Motivo:* Testar o fluxo principal e esperado de uso.
- *Criticidade:* Crítico

---

### 🔹 Cenário 2 – Tentativa de login com e-mail inválido

- *Condição de Teste:* Usuário não registrado.
- *Pré-Condição:* Acesso ao site.
- *Passo a Passo:*
  - Acessar a página de login
  - Preencher um e-mail que não existe no sistema
  - Preencher uma senha qualquer
  - Clicar em "Login"
- *Resultado Esperado:* Exibição de mensagem de erro informando que o usuário não foi encontrado (Email/ou senha inválidos).
- *Motivo:* Verificar manipulação de erros com credenciais incorretas.
- *Criticidade:* Alta

---

### 🔹 Cenário 3 – Tentativa de login com senha inválida

- *Condição de Teste:* Usuário válido cadastrado.
- *Pré-Condição:* Acesso ao site.
- *Passo a Passo:*
  - Inserir e-mail válido
  - Inserir senha incorreta
  - Clicar em "Login"
- *Resultado Esperado:* Exibição de mensagem de erro de autenticação (Email/ou senha inválidos).
- *Motivo:* Garantir que senhas incorretas não sejam aceitas.
- *Criticidade:* Alta

---

### 🔹 Cenário 4 – Tentativa de login com campos obrigatórios vazios

- *Condição de Teste:* Nenhum campo preenchido.
- *Pré-Condição:* Acesso ao site.
- *Passo a Passo:*
  - Acessar a página de login
  - Clicar diretamente em "Login" sem preencher e-mail nem senha
- *Resultado Esperado:* Exibição de mensagens de validação (Password não pode ficar em branco).
- *Motivo:* Validar comportamentos básicos de formulário.
- *Criticidade:* Média

---

### 🔹 Cenário 5 – Link para registro de novo usuario

- *Condição de Teste:* Página de login aberta.
- *Pré-Condição:* Acesso ao site.
- *Passo a Passo:*
  - Clicar no botão "Cadastre-se"
- *Resultado Esperado:* Redirecionamento para a página de cadastro.
- *Motivo:* Garantir navegação correta entre páginas.
- *Criticidade:* Baixa

---

  

## Etapa 2 : Desenvolvimento dos testes automatizados de UI

### Este projeto contém a automação dos testes de interface do usuário (UI) desenvolvidos com base nos cenários definidos na Etapa 1 do desafio técnico de QA.

🚀 Tecnologias
- [Node.js] - plataforma de desenvolvimento
  
- [TypesScript] - Superset do Javascript s2
  
- [Playwright] - framework de testes automatizados
  
👨🏻‍💻 Como executar o projeto

Node.js v16 ou superior para executar.

Abra o Prompt de comandos como Administrador e ative o Yarn por meio do Corepack executando o comando abaixo:
- corepack enable
  
Execute os comandos abaixo para instalar das dependências do projeto e execução dos testes:

- cd playwright-validando-toaster
- yarn install
- npx playwright install
- npx playwright test

📌 Executar testes em navegadores específicos
  
- Chromium (Chrome): npx playwright test --project=chromium

- Firefox: npx playwright test --project=firefox

- WebKit (Safari): npx playwright test --project=webkit
