import { test, expect } from '../fixtures/fixtures';
import { allure } from 'allure-playwright';
import { TestData } from '../fixtures/test-data';

test.describe('Login - SauceDemo', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Deve realizar login com sucesso', async ({ loginPage, inventoryPage, page }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com credenciais válidas');

    await allure.step('Preencher credenciais válidas', async () => {
      await loginPage.login(
        TestData.credentials.valid.username,
        TestData.credentials.valid.password
      );
    });

    await allure.step('Validar redirecionamento para página de produtos', async () => {
      await inventoryPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*inventory\.html/);
      expect(await inventoryPage.isPageLoaded()).toBe(true);
    });

    await allure.step('Validar presença da lista de produtos', async () => {
      const hasProducts = await inventoryPage.verifyProductsListVisible();
      expect(hasProducts).toBe(true);

      const productsCount = await inventoryPage.getProductsCount();
      expect(productsCount).toBeGreaterThan(0);
      expect(productsCount).toBe(6); // SauceDemo sempre tem 6 produtos
    });
  });

  test('Deve exibir erro ao tentar login com senha inválida', async ({ loginPage, inventoryPage, page }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com credenciais inválidas - Senha incorreta');

    await allure.step('Preencher usuário válido e senha inválida', async () => {
      await loginPage.login(
        TestData.credentials.invalidPassword.username,
        TestData.credentials.invalidPassword.password
      );
    });

    await allure.step('Validar mensagem de erro exibida', async () => {
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBe(true);

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.invalidCredentials);
    });

    await allure.step('Validar que não foi redirecionado', async () => {
      await expect(page).toHaveURL(/.*\/$/);
      expect(await inventoryPage.isPageLoaded()).toBe(false);
    });
  });

  test('Deve exibir erro ao tentar login com usuário inválido', async ({ loginPage, inventoryPage, page }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com credenciais inválidas - Usuário incorreto');

    await allure.step('Preencher usuário inválido e senha válida', async () => {
      await loginPage.login(
        TestData.credentials.invalidUsername.username,
        TestData.credentials.invalidUsername.password
      );
    });

    await allure.step('Validar mensagem de erro exibida', async () => {
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBe(true);

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.invalidCredentials);
    });

    await allure.step('Validar que não foi redirecionado', async () => {
      await expect(page).toHaveURL(/.*\/$/);
      expect(await inventoryPage.isPageLoaded()).toBe(false);
    });
  });

  test('Deve exibir erro ao tentar login com usuário e senha em branco', async ({ loginPage, inventoryPage, page }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com dados em branco');

    await allure.step('Tentar fazer login sem preencher campos', async () => {
      await loginPage.clickLogin();
    });

    await allure.step('Validar mensagem de erro obrigatória', async () => {
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBe(true);

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.requiredUsername);
    });

    await allure.step('Validar que não foi redirecionado', async () => {
      await expect(page).toHaveURL(/.*\/$/);
      expect(await inventoryPage.isPageLoaded()).toBe(false);
    });
  });

  test('Deve exibir erro ao tentar login apenas com usuário em branco', async ({ loginPage }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com usuário em branco');

    await allure.step('Preencher apenas senha', async () => {
      await loginPage.fillPassword(TestData.credentials.valid.password);
      await loginPage.clickLogin();
    });

    await allure.step('Validar mensagem de erro obrigatória', async () => {
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBe(true);

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.requiredUsername);
    });
  });

  test('Deve exibir erro ao tentar login apenas com senha em branco', async ({ loginPage }) => {
    await allure.epic('Autenticação');
    await allure.feature('Login');
    await allure.story('Login com senha em branco');

    await allure.step('Preencher apenas usuário', async () => {
      await loginPage.fillUsername(TestData.credentials.valid.username);
      await loginPage.clickLogin();
    });

    await allure.step('Validar mensagem de erro obrigatória', async () => {
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBe(true);

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.requiredPassword);
    });
  });
});
