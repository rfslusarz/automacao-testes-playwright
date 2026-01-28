import { test, expect } from '../fixtures/fixtures';
import { allure } from 'allure-playwright';
import { TestData } from '../fixtures/test-data';

test.describe('E2E - Fluxo Completo de Compra', () => {

  test('Deve completar fluxo de compra com sucesso', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await allure.epic('E2E - Compra');
    await allure.feature('Fluxo Completo de Compra');
    await allure.story('Compra completa do início ao fim');

    // Step 1: Login
    await allure.step('1. Realizar login com credenciais válidas', async () => {
      await loginPage.navigate();
      await loginPage.login(
        TestData.credentials.valid.username,
        TestData.credentials.valid.password
      );
      await inventoryPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*inventory\.html/);
      expect(await inventoryPage.isPageLoaded()).toBe(true);
    });

    // Step 2: Listagem de produtos
    await allure.step('2. Validar listagem de produtos', async () => {
      const hasProducts = await inventoryPage.verifyProductsListVisible();
      expect(hasProducts).toBe(true);

      const productsCount = await inventoryPage.getProductsCount();
      expect(productsCount).toBeGreaterThan(0);
    });

    // Step 3: Adicionar produto ao carrinho
    await allure.step('3. Adicionar produto ao carrinho', async () => {
      await inventoryPage.addProductToCart(TestData.products.sauceLabsBackpack);

      const cartItemsCount = await inventoryPage.getCartItemsCount();
      expect(cartItemsCount).toBe(1);
    });

    // Step 4: Acessar o carrinho
    await allure.step('4. Acessar o carrinho', async () => {
      await inventoryPage.clickCartIcon();
      await cartPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*cart\.html/);
      expect(await cartPage.isPageLoaded()).toBe(true);
    });

    // Step 5: Validar produto no carrinho
    await allure.step('5. Validar produto adicionado no carrinho', async () => {
      const cartItemsCount = await cartPage.getCartItemsCount();
      expect(cartItemsCount).toBe(1);

      const productName = await cartPage.getProductName(0);
      expect(productName).toContain(TestData.products.sauceLabsBackpack);
    });

    // Step 6: Iniciar checkout
    await allure.step('6. Iniciar checkout', async () => {
      await cartPage.clickCheckout();
      await checkoutPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      expect(await checkoutPage.isPageLoaded()).toBe(true);
    });

    // Step 7: Preencher dados do comprador
    await allure.step('7. Preencher dados do comprador', async () => {
      await checkoutPage.fillCheckoutForm(
        TestData.checkout.firstName,
        TestData.checkout.lastName,
        TestData.checkout.postalCode
      );
    });

    // Step 8: Continuar para revisão
    await allure.step('8. Continuar para página de revisão', async () => {
      await checkoutPage.clickContinue();
      await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });

    // Step 9: Finalizar compra
    await allure.step('9. Finalizar a compra', async () => {
      await checkoutPage.clickFinish();
      await expect(page).toHaveURL(/.*checkout-complete\.html/);
    });

    // Step 10: Validar mensagem de sucesso
    await allure.step('10. Validar mensagem de sucesso', async () => {
      const orderSuccess = await checkoutPage.verifyOrderSuccess();
      expect(orderSuccess).toBe(true);

      const completeHeader = await checkoutPage.getCompleteHeader();
      expect(completeHeader).toContain(TestData.successMessages.orderComplete);

      // Validação adicional usando expect do Playwright
      await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });
  });

  test('Deve completar fluxo de compra com múltiplos produtos', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await allure.epic('E2E - Compra');
    await allure.feature('Fluxo Completo de Compra');
    await allure.story('Compra com múltiplos produtos');

    // Login
    await allure.step('1. Realizar login com credenciais válidas', async () => {
      await loginPage.navigate();
      await loginPage.login(
        TestData.credentials.valid.username,
        TestData.credentials.valid.password
      );
      await inventoryPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*inventory\.html/);
    });

    // Adicionar múltiplos produtos
    await allure.step('2. Adicionar múltiplos produtos ao carrinho', async () => {
      await inventoryPage.addProductToCart(TestData.products.sauceLabsBackpack);
      await inventoryPage.addProductToCart(TestData.products.sauceLabsBikeLight);

      const cartItemsCount = await inventoryPage.getCartItemsCount();
      expect(cartItemsCount).toBe(2);
    });

    // Acessar carrinho
    await allure.step('3. Acessar o carrinho', async () => {
      await inventoryPage.clickCartIcon();
      await cartPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*cart\.html/);
    });

    // Validar produtos no carrinho
    await allure.step('4. Validar produtos no carrinho', async () => {
      const cartItemsCount = await cartPage.getCartItemsCount();
      expect(cartItemsCount).toBe(2);
    });

    // Checkout
    await allure.step('5. Iniciar checkout e preencher dados', async () => {
      await cartPage.clickCheckout();
      await checkoutPage.waitForPageLoad();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);

      await checkoutPage.fillCheckoutForm(
        TestData.checkout.firstName,
        TestData.checkout.lastName,
        TestData.checkout.postalCode
      );
      await checkoutPage.clickContinue();
      await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });

    // Finalizar compra
    await allure.step('6. Finalizar a compra', async () => {
      await checkoutPage.clickFinish();
      await expect(page).toHaveURL(/.*checkout-complete\.html/);
    });

    // Validar sucesso
    await allure.step('7. Validar mensagem de sucesso', async () => {
      const orderSuccess = await checkoutPage.verifyOrderSuccess();
      expect(orderSuccess).toBe(true);
      await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });
  });
});
