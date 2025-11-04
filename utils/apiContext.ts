import { request } from '@playwright/test';
import { currentConfig } from '../config/env';
import { BASE_URL } from './env.config';


export async function getAPIContext() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (currentConfig.token) {
    headers['Authorization'] = `Bearer ${currentConfig.token}`;
  }

  return await request.newContext({
    baseURL: currentConfig.baseURL,
    extraHTTPHeaders: headers,
  });
}