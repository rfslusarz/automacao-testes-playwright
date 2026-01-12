import { Page } from '@playwright/test';

export class Helpers {
  static async waitForNavigation(page: Page, urlPattern: string): Promise<void> {
    await page.waitForURL(`**${urlPattern}`, { timeout: 10000 });
  }

  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  static async waitForElementToBeVisible(page: Page, selector: string): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  }

  static async waitForElementToBeHidden(page: Page, selector: string): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout: 10000 });
  }
}
