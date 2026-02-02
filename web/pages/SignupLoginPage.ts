import { Page, expect } from '@playwright/test';
import { Logger } from '../utils/logger';
import { loadUserFixture } from '../utils/testData';

export class SignupLoginPage {
  private readonly logger = new Logger('SignupLoginPage');

  constructor(private readonly page: Page) {}

  async signupNewUser(uniqueEmail: string): Promise<void> {
    const user = loadUserFixture();
    this.logger.info('Filling New User Signup form');

    await expect(this.page.getByText('New User Signup!')).toBeVisible();

    await this.page.locator('input[data-qa="signup-name"]').fill(user.name);
    await this.page.locator('input[data-qa="signup-email"]').fill(uniqueEmail);
    await this.page.locator('button[data-qa="signup-button"]').click();
  }

  async fillAccountDetails(uniqueEmail: string): Promise<void> {
    const user = loadUserFixture();
    this.logger.info('Filling account details form');

    await expect(this.page.getByText('Enter Account Information')).toBeVisible();

    await this.page.locator(`input[value="${user.title}"]`).check();
    await this.page.locator('input[data-qa="password"]').fill(user.password);
    await this.page.locator('select[data-qa="days"]').selectOption(user.birth_date);
    await this.page.locator('select[data-qa="months"]').selectOption(user.birth_month);
    await this.page.locator('select[data-qa="years"]').selectOption(user.birth_year);

    await this.page.locator('input[data-qa="first_name"]').fill(user.firstname);
    await this.page.locator('input[data-qa="last_name"]').fill(user.lastname);
    await this.page.locator('input[data-qa="company"]').fill(user.company);
    await this.page.locator('input[data-qa="address"]').fill(user.address1);
    await this.page.locator('input[data-qa="address2"]').fill(user.address2);
    await this.page.locator('select[data-qa="country"]').selectOption(user.country);
    await this.page.locator('input[data-qa="state"]').fill(user.state);
    await this.page.locator('input[data-qa="city"]').fill(user.city);
    await this.page.locator('input[data-qa="zipcode"]').fill(user.zipcode);
    await this.page.locator('input[data-qa="mobile_number"]').fill(user.mobile_number);

    await this.page.locator('button[data-qa="create-account"]').click();

    await expect(this.page.getByText('Account Created!')).toBeVisible();
    await this.page.locator('a[data-qa="continue-button"]').click();
  }

  async login(email: string, password: string): Promise<void> {
    this.logger.info('Logging in existing user');

    await expect(this.page.getByText('Login to your account')).toBeVisible();

    await this.page.locator('input[data-qa="login-email"]').fill(email);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    await this.page.locator('button[data-qa="login-button"]').click();
  }

  async assertLoggedIn(username: string): Promise<void> {
    // Prefer a stable locator over exact text match to reduce flakiness.
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible();
  }
}

