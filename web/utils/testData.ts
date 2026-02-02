import { readFileSync } from 'fs';
import { join } from 'path';

interface UserData {
  name: string;
  emailPrefix: string;
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

export function loadUserFixture(): UserData {
  const filePath = join(process.cwd(), 'data', 'users.json');
  const raw = readFileSync(filePath, 'utf-8');
  const users: UserData[] = JSON.parse(raw);
  return users[0];
}

export function buildUniqueEmail(prefix: string): string {
  const timestamp = Date.now();
  return `${prefix}+${timestamp}@example.com`;
}

