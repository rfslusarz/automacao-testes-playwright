import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate(): Promise<void> {
    await allure.step('Navegar para a página de login', async () => {
      await this.page.goto('/');
      await this.page.waitForLoadState('domcontentloaded');
      await this.usernameInput.waitFor({ state: 'visible' });
    });
  }

  async fillUsername(username: string): Promise<void> {
    await allure.step(`Preencher usuário: ${username}`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  async fillPassword(password: string): Promise<void> {
    await allure.step('Preencher senha', async () => {
      await this.passwordInput.fill(password);
    });
  }

  async clickLogin(): Promise<void> {
    await allure.step('Clicar no botão de login', async () => {
      await this.loginButton.click();
    });
  }

  async login(username: string, password: string): Promise<void> {
    await allure.step(`Realizar login com usuário: ${username}`, async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
    });
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return await this.errorMessage.textContent() || '';
  }

  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorMessage.isVisible();
    } catch {
      return false;
    }
  }
}
