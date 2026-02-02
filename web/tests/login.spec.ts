import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { loadUserFixture, buildUniqueEmail } from '../utils/testData';
import { ApiClient } from '../../api/client/ApiClient';
import { getEnvConfig } from '../utils/config';

test.describe('User Login Flow', () => {
  test('should login with a user created via API', async ({ page, request }) => {
    const env = getEnvConfig();
    const apiClient = new ApiClient(request, env.apiBaseUrl);
    const user = loadUserFixture();
    const email = buildUniqueEmail(user.emailPrefix);

    await apiClient.createAccount({
      ...user,
      email,
    });

    const home = new HomePage(page);
    const auth = new SignupLoginPage(page);

    await home.goto();
    await home.clickSignupLogin();
    await auth.login(email, user.password);
    await auth.assertLoggedIn(user.name);
  });
});

