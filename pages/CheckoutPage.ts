import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-text');
    this.completeHeader = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async waitForPageLoad(): Promise<void> {
    await allure.step('Aguardar carregamento da página de checkout', async () => {
      await this.page.waitForURL('**/checkout-step-one.html');
      await this.firstNameInput.waitFor({ state: 'visible' });
    });
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.page.url().includes('/checkout-step-one.html');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await allure.step(`Preencher First Name: ${firstName}`, async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastName(lastName: string): Promise<void> {
    await allure.step(`Preencher Last Name: ${lastName}`, async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await allure.step(`Preencher Postal Code: ${postalCode}`, async () => {
      await this.postalCodeInput.fill(postalCode);
    });
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await allure.step('Preencher formulário de checkout', async () => {
      await this.fillFirstName(firstName);
      await this.fillLastName(lastName);
      await this.fillPostalCode(postalCode);
    });
  }

  async clickContinue(): Promise<void> {
    await allure.step('Clicar no botão Continue', async () => {
      await this.continueButton.click();
      await this.page.waitForURL('**/checkout-step-two.html', { timeout: 10000 });
    });
  }

  async clickFinish(): Promise<void> {
    await allure.step('Clicar no botão Finish', async () => {
      await this.finishButton.click();
      await this.page.waitForURL('**/checkout-complete.html', { timeout: 10000 });
    });
  }

  async getSuccessMessage(): Promise<string> {
    return await this.successMessage.textContent() || '';
  }

  async getCompleteHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  async verifyOrderSuccess(): Promise<boolean> {
    const header = await this.getCompleteHeader();
    return header.includes('Thank you for your order!');
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
