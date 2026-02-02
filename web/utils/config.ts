import devConfig from '../../config/env.dev.json';
import qaConfig from '../../config/env.qa.json';

export type EnvironmentName = 'dev' | 'qa';

export interface TestEnvironmentConfig {
  name: string;
  baseUrl: string;
  apiBaseUrl: string;
}

export function getEnvConfig(): TestEnvironmentConfig {
  const env = (process.env.TEST_ENV as EnvironmentName) || 'dev';
  switch (env) {
    case 'qa':
      return qaConfig;
    case 'dev':
    default:
      return devConfig;
  }
}

