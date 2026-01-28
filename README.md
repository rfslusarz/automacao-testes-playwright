# 🎭 SauceDemo - Playwright Automation Pattern

![Playwright](https://img.shields.io/badge/Playwright-1.40+-45ba4b?style=flat-square&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8.0+-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)

> **Portfolio Project**: Demonstração de arquitetura robusta e escalável para automação de testes E2E.

[🔗 **Ver Relatório de Testes Online**](https://rfslusarz.github.io/saucedemo-automation-playwright/)  
*(Link disponível após a primeira execução da pipeline no GitHub Actions)*

---

## 🏗️ Arquitetura do Projeto

Este projeto utiliza **test fixtures** customizadas para injeção de dependência, garantindo testes limpos e desacoplados.

```mermaid
classDiagram
    class Test {
        +test()
    }
    class Fixtures {
        +loginPage
        +inventoryPage
        +cartPage
        +checkoutPage
    }
    class PageObject {
        +Locators
        +Methods
    }
    
    Test --> Fixtures : consome
    Fixtures --> PageObject : instancia
```

## 🧠 Decisões Técnicas

| Decisão | Por quê? |
|---------|----------|
| **Custom Fixtures** | Remove a repetição de `new Page(page)` nos testes, facilitando a escrita e manutenção. |
| **Page Object Model** | Separa a lógica de interação da página da lógica de testes. |
| **ESLint + Prettier** | Garante que o código siga padrões estritos de qualidade e formatação (essencial para times grandes). |
| **GitHub Actions** | Executa os testes automaticamente a cada Push/PR e publica o relatório na web. |
| **Allure Report** | Fornece visualização detalhada de passos, screenshots e histórico de execução. |

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+

### Instalação
```bash
npm install
npx playwright install --with-deps
```

### Comandos Principais
```bash
# Rodar todos os testes
npm test

# Rodar testes de Login
npm run test:login

# Rodar com interface visual (Debug)
npm run test:ui

# Verificar qualidade do código
npm run lint
```

## 📂 Estrutura de Pastas

```
.
├── .github/          # Configuração de CI/CD
├── fixtures/         # Injeção de Dependência Customizada
├── pages/            # Page Objects (Mapeamento de elementos e ações)
├── tests/            # Especificações de Teste (Specs)
├── utils/            # Funções auxiliares
├── .eslintrc.json    # Regras de Code Quality
├── playwright.yml    # Pipeline do GitHub Actions
└── package.json      # Dependências e Scripts
```
