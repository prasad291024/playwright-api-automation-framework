const ENVIRONMENTS = ['dev', 'staging', 'prod'] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

const rawEnv = process.env.TEST_ENV || 'dev';
const isEnvironment = (value: string): value is Environment =>
  (ENVIRONMENTS as readonly string[]).includes(value);

if (!isEnvironment(rawEnv)) {
  throw new Error(
    `Unsupported TEST_ENV="${rawEnv}". Expected one of: ${ENVIRONMENTS.join(', ')}`
  );
}

const config: Record<Environment, { baseURL: string; token: string }> = {
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

export const currentConfig = config[rawEnv];
export const currentEnv = rawEnv;
