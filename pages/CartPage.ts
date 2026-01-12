import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.getByRole('button', { name: /remove/i });
  }

  async waitForPageLoad(): Promise<void> {
    await allure.step('Aguardar carregamento da página do carrinho', async () => {
      await this.page.waitForURL('**/cart.html');
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.page.url().includes('/cart.html');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getProductName(index: number): Promise<string> {
    const productName = this.cartItems.nth(index).locator('.inventory_item_name');
    return await productName.textContent() || '';
  }

  async clickCheckout(): Promise<void> {
    await allure.step('Clicar no botão Checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  async clickContinueShopping(): Promise<void> {
    await allure.step('Clicar no botão Continue Shopping', async () => {
      await this.continueShoppingButton.click();
    });
  }

  async removeProduct(index: number): Promise<void> {
    await allure.step(`Remover produto do índice ${index}`, async () => {
      const removeButton = this.removeButtons.nth(index);
      await removeButton.click();
    });
  }

  async verifyCartHasItems(): Promise<boolean> {
    const count = await this.getCartItemsCount();
    return count > 0;
  }
}
