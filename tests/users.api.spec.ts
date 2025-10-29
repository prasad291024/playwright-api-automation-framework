import { test, expect } from '@playwright/test';
import { getAPIContext } from '../utils/apiContext';

test('GET /users returns valid data', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.get('/users');

  // Basic status code check
  expect(response.status()).toBe(200);

  // Parse response
  const users = await response.json();

  // Validate structure
  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);

  // Check a few fields in the first user
  const firstUser = users[0];
  expect(firstUser).toHaveProperty('id');
  expect(firstUser).toHaveProperty('name');
  expect(firstUser).toHaveProperty('email');
});