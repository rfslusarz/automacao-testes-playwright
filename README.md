# Automação de Testes - SauceDemo

Projeto de demonstração para portfólio de automação de testes E2E na aplicação SauceDemo, utilizando o Playwright como framework e JavaScript como linguagem (com suporte a TypeScript) e gerando relatórios com Allure.

## Tecnologias

- Playwright - Framework de automação E2E
- JavaScript/TypeScript - Linguagem de programação
- Allure Reports - Relatórios de testes
- Page Object Model (POM) - Padrão de design para organização do código

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

## Instalação

```bash
npm install
```

## Executar Testes

### Todos os testes
```bash
npm test
```

### Testes de login
```bash
npm run test:login
```

### Teste E2E de compra
```bash
npm run test:checkout
```

### Modo UI (interativo)
```bash
npm run test:ui
```

### Modo debug
```bash
npm run test:debug
```

## Relatórios Allure

### Gerar relatório
```bash
npm run allure:generate
```

### Abrir relatório
```bash
npm run allure:open
```

### Servir relatório (desenvolvimento)
```bash
npm run allure:serve
```

## Estrutura do Projeto

```
.
├── tests/
│   ├── login.spec.ts
│   └── checkout.e2e.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   ├── test-data.ts
│   └── users.json
├── utils/
│   └── helpers.ts
├── playwright.config.ts
└── package.json
```

## Credenciais

- **Usuário válido**: `standard_user`
- **Senha válida**: `secret_sauce`

## Cenários de Teste

### Login
- Login com sucesso
  - Acessar página de login
  - Informar credenciais válidas
  - Validar redirecionamento para /inventory.html
  - Validar exibição da lista de produtos

- Login inválido
  - Usuário válido + senha inválida
  - Usuário inválido + senha válida
  - Validar mensagem de erro exibida

- Login com campos em branco
  - Validar mensagem de erro obrigatória
  - Validar que não foi redirecionado

### E2E – Fluxo completo de compra
- Fluxo completo de compra
  - Login com sucesso
  - Adicionar pelo menos 1 produto ao carrinho
  - Acessar o carrinho
  - Iniciar checkout
  - Preencher dados do comprador (First Name, Last Name, Postal Code)
  - Continuar e finalizar compra
  - Validar mensagem: "Thank you for your order!"

## Boas Práticas Implementadas

- Page Object Model (POM) - Separação clara entre páginas e testes
- Seletores estáveis - Uso de `data-test` attributes e `getByRole`
- Assertions confiáveis - Uso de `expect` do Playwright
- Sem waitForTimeout - Uso apenas de waits inteligentes
- Testes independentes - Cada teste pode ser executado isoladamente
- Allure Reports - Relatórios detalhados com steps organizados
- Screenshots automáticos - Capturas em caso de falha
- Hooks configurados - `beforeEach` e `afterEach` para setup/teardown
- TypeScript - Tipagem forte para maior confiabilidade
