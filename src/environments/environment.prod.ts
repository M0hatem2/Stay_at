import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  api: {
    baseUrl: 'https://api.homigo-eg.com/api/v1',
    timeout: 30000,
    retryAttempts: 1
  },
  features: {
    enableLogging: false,
    enableDebugMode: false
  }
};
