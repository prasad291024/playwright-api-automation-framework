# 🎯 Playwright API Automation Framework

This is a modular and scalable API testing framework built using [Playwright](https://playwright.dev/).

---

## 📦 Tech Stack

- [Playwright Test Runner](https://playwright.dev/docs/test-api-testing)
- TypeScript
- AJV (Another JSON Validator)
- Node.js

---

## 📁 Folder Structure

```
playwright-api-automation-framework/
│
├── tests/                   # API test cases
│   ├── users.api.spec.ts    # Example: GET /users
│   └── auth.api.spec.ts     # Example: POST /login
│
├── schemas/                 # JSON schemas for validation
│   └── user.schema.json
│
├── utils/                   # Reusable helpers
│   └── schemaValidator.ts   # AJV-based validator
│
├── apiContext.ts            # Shared request context
│
├── config/                  # Environment configs
│   └── env.ts               # Base URLs, tokens, etc.
│
├── data/                    # Test payloads (optional)
│   └── userPayloads.ts
│
├── playwright.config.ts     # Playwright test runner config
├── package.json             # Dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/playwright-api-automation-framework
cd playwright-api-automation-framework
```

### 2. Install dependencies

```bash
npm install
npx playwright install
```

### 3. Run tests

```bash
npx playwright test
```

---

## ✅ Features

- Modular API test structure  
- Shared request context using `request.newContext()`  
- JSON schema validation with AJV  
- Environment config support  
- Easy to extend and integrate with CI/CD  

---

## 🧪 Sample Test

```typescript
test('GET /users returns valid data', async () => {
  const apiContext = await getAPIContext();
  const response = await apiContext.get('/users');
  expect(response.status()).toBe(200);
});
```

---

## 🧪 Status Badge

```![GitHub Actions](https://user-images.githubusercontent.com/3797062/65786081-ce0cdb00-e190-11e9-9430-f89d1c4a063e.png)
![Playwright API Tests](https://github.com/prasad291024/playwright-api-automation-framework/actions/workflows/playwright-api.yml/badge.svg)
```

---

## 📄 License

MIT License

---

## 🙌 Author

**Prasad** — building clean, scalable test automation frameworks with Playwright.
