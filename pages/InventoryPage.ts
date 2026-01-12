import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productsContainer: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productsContainer = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async waitForPageLoad(): Promise<void> {
    await allure.step('Aguardar carregamento da página de produtos', async () => {
      await this.page.waitForURL('**/inventory.html');
      await this.productsContainer.waitFor({ state: 'visible' });
    });
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.page.url().includes('/inventory.html');
  }

  async getProductByName(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    await allure.step(`Adicionar produto ao carrinho: ${productName}`, async () => {
      const product = await this.getProductByName(productName);
      const addToCartButton = product.getByRole('button', { name: /add to cart/i });
      await addToCartButton.waitFor({ state: 'visible' });
      await addToCartButton.click();
    });
  }

  async getCartItemsCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible().catch(() => false);
    if (!isVisible) {
      return 0;
    }
    const badgeText = await this.cartBadge.textContent();
    return badgeText ? parseInt(badgeText.trim()) : 0;
  }

  async clickCartIcon(): Promise<void> {
    await allure.step('Clicar no ícone do carrinho', async () => {
      await this.cartIcon.click();
    });
  }

  async getProductsCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async verifyProductsListVisible(): Promise<boolean> {
    return await this.productsContainer.isVisible();
  }
}
