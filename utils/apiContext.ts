import { request } from '@playwright/test';

export async function getAPIContext() {
  return await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
}