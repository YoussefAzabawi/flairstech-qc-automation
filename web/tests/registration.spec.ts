import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { buildUniqueEmail, loadUserFixture } from '../utils/testData';

test.describe('User Registration Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    const user = loadUserFixture();
    const email = buildUniqueEmail(user.emailPrefix);

    const home = new HomePage(page);
    const auth = new SignupLoginPage(page);

    await home.goto();
    await home.clickSignupLogin();
    await auth.signupNewUser(email);
    await auth.fillAccountDetails(email);
    await auth.assertLoggedIn(user.name);
  });
});

