type Environment = 'dev' | 'staging' | 'prod';

const ENV: Environment = process.env.TEST_ENV as Environment || 'dev';

const config = {
  dev: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    token: '', // Add if needed
  },
  staging: {
    baseURL: 'https://staging.api.example.com',
    token: 'staging-token',
  },
  prod: {
    baseURL: 'https://api.example.com',
    token: 'prod-token',
  },
};

export const currentConfig = config[ENV];