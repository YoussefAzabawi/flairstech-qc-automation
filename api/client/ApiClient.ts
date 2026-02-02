import { APIRequestContext, expect } from '@playwright/test';

export interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async verifyLogin(email: string, password: string) {
    const response = await this.request.post(`${this.baseUrl}/verifyLogin`, {
      form: { email, password },
    });
    return response;
  }

  async createAccount(payload: CreateAccountRequest) {
    const response = await this.request.post(`${this.baseUrl}/createAccount`, {
      form: payload,
    });

    // Basic assertion to fail fast when API is not behaving as expected.
    // Documentation mentions 201, but the real API often responds with 200.
    expect(
      [200, 201].includes(response.status()),
      `Create account status code was ${response.status()}`,
    ).toBe(true);
    const body = await response.json();
    expect(body).toHaveProperty('message');
    return body;
  }
}

