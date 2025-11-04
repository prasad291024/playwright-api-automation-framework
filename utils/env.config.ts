const environments = {
  dev: 'https://dev.api.example.com',
  stage: 'https://stage.api.example.com',
  prod: 'https://api.example.com',
};

type EnvKey = keyof typeof environments;
const currentEnv = (process.env.TEST_ENV || 'dev') as EnvKey;

export const BASE_URL = environments[currentEnv];