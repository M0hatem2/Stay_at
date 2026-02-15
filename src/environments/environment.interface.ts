export interface Environment {
  production: boolean;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    enableLogging: boolean;
    enableDebugMode: boolean;
  };
}