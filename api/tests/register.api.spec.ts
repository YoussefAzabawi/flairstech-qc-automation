import { test, expect } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { getEnvConfig } from '../../web/utils/config';
import { loadUserFixture, buildUniqueEmail } from '../../web/utils/testData';

test.describe('Register API', () => {
  test('should create a new user successfully', async ({ request }) => {
    const env = getEnvConfig();
    const client = new ApiClient(request, env.apiBaseUrl);
    const user = loadUserFixture();
    const email = buildUniqueEmail(user.emailPrefix);

    const body = await client.createAccount({
      ...user,
      email,
    });

    expect(body.message).toContain('User created');
  });

  test('should fail when required fields are missing', async ({ request }) => {
    const env = getEnvConfig();
    const client = new ApiClient(request, env.apiBaseUrl);

    const response = await request.post(`${env.apiBaseUrl}/createAccount`, {
      form: {
        // omit many required fields on purpose
        name: 'Incomplete User',
        email: 'incomplete@example.com',
        password: 'Password123!',
      },
    });

    const body = await response.json();

    // HTTP status is often 200, so assert using payload-level responseCode instead.
    expect(Number(body.responseCode)).toBeGreaterThanOrEqual(400);
  });
});

