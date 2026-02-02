import { test, expect } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { getEnvConfig } from '../../web/utils/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import Ajv from 'ajv';
import { loginSuccessSchema, loginErrorSchema } from '../schemas/loginSchema';
import { loadUserFixture, buildUniqueEmail } from '../../web/utils/testData';

interface CsvRow {
  scenario: string;
  email: string;
  password: string;
  expectedStatus: string;
  expectedMessage: string;
}

function loadCsvData(): CsvRow[] {
  const filePath = join(process.cwd(), 'data', 'apiUsers.csv');
  const raw = readFileSync(filePath, 'utf-8');
  const [headerLine, ...rows] = raw.trim().split('\n');
  const headers = headerLine.split(',');

  return rows.map((line) => {
    const cols = line.split(',');
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = cols[idx] ?? '';
    });
    return record as unknown as CsvRow;
  });
}

const ajv = new Ajv();
const validateSuccess = ajv.compile(loginSuccessSchema);
const validateError = ajv.compile(loginErrorSchema);

test.describe('Login API', () => {
  const env = getEnvConfig();

  for (const row of loadCsvData()) {
    test(`verifyLogin - ${row.scenario}`, async ({ request }) => {
      const client = new ApiClient(request, env.apiBaseUrl);
      let email = row.email;
      let password = row.password;

      // For the "valid" scenario, create a real user first so that
      // we can assert the happy path reliably.
      if (row.scenario === 'valid') {
        const user = loadUserFixture();
        email = buildUniqueEmail(user.emailPrefix);
        password = user.password;
        await client.createAccount({
          ...user,
          email,
        });
      }

      const response = await client.verifyLogin(email, password);

      // Many AutomationExercise APIs respond with HTTP 200 even for errors.
      // We still validate the documented status code via the response payload.
      expect(response.status()).toBe(200);

      const body = await response.json();
      const validate = Number(row.expectedStatus) === 200 ? validateSuccess : validateError;
      const valid = validate(body);

      expect(valid, `Schema validation errors: ${JSON.stringify(validate.errors)}`).toBe(true);
      expect(Number(body.responseCode)).toBe(Number(row.expectedStatus));
      expect(String(body.message)).toContain(row.expectedMessage.replace(/"/g, ''));
    });
  }
});

