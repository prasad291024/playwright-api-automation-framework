import { test, expect } from '@playwright/test';
import { getAPIContext } from '../utils/apiContext';
import { validateSchema } from '../utils/schemaValidator';


test('GET /users returns valid data', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.get('/users');

 
  // negative test for invalid user ID
  test('GET /users/:id with invalid ID returns 404', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.get('/users/99999'); // Assuming this ID doesn't exist

  expect(response.status()).toBe(404); // jsonplaceholder returns 404 for invalid user
});

// negative test for invalid endpoint or missing endpoint 
test('GET /invalid-endpoint returns 404', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.get('/invalid-endpoint');

  expect(response.status()).toBe(404);
});


// negative test for POST /users with missing fields or invalid paylod for POST request
test('POST /users with missing fields returns 400', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.post('/users', {
    data: {
      // Missing required fields like name or email
    },
  });

  expect(response.status()).toBe(400); // Depends on API behavior
});



  // Basic status code check
  expect(response.status()).toBe(200);

  // Parse response
  const users = await response.json();

  // Validate structure
  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);

    // Validate against schema
  validateSchema('user.schema.json', users);


  // Check a few fields in the first user
  const firstUser = users[0];
  expect(firstUser).toHaveProperty('id');
  expect(firstUser).toHaveProperty('name');
  expect(firstUser).toHaveProperty('email');
});