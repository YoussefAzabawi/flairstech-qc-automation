import { Page, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export class HomePage {
  private readonly logger = new Logger('HomePage');

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    this.logger.info('Navigating to home page');
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async clickSignupLogin(): Promise<void> {
    this.logger.info('Clicking Signup / Login link');
    await this.page.locator('a[href="/login"]').click();
  }
}

