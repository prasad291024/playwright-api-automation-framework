# Playwright API Automation Framework

Modular API testing framework built on Playwright Test with TypeScript and JSON schema validation.

## Tech Stack
- Playwright Test Runner (API testing)
- TypeScript
- AJV (JSON schema validation)
- Node.js

## Folder Structure
```
API_Automation_Framework/
|-- .github/
|   |-- workflows/
|       |-- playwright-api.yml
|-- config/
|   |-- env.ts
|-- data/
|   |-- users.json
|-- docs/
|   |-- planning/
|-- schemas/
|   |-- user.schema.json
|-- tests/
|   |-- users.api.spec.ts
|-- utils/
|   |-- apiContext.ts
|   |-- logger.ts
|   |-- schemaValidator.ts
|   |-- testDataGenerator.ts
|-- playwright.config.ts
|-- package.json
|-- README.md
```

## Getting Started
### 1. Clone
```
git clone https://github.com/prasad291024/playwright-api-automation-framework.git
cd playwright-api-automation-framework
```

### 2. Install
```
npm install
npx playwright install
```

### 3. Run Tests
```
npm test
```

## Scripts
- `npm test`: run all Playwright API tests
- `npm run test:dev`: run tests with `TEST_ENV=dev`
- `npm run test:staging`: run tests with `TEST_ENV=staging`
- `npm run test:prod`: run tests with `TEST_ENV=prod`
- `npm run lint`: lint TypeScript files
- `npm run typecheck`: TypeScript typecheck
- `npm run format`: format supported files
- `npm run format:check`: verify formatting

## Environment Configuration
`config/env.ts` is the single source of truth.
- Supported environments: `dev`, `staging`, `prod`
- Example:
```
TEST_ENV=staging npm test
```

## Notes
- The default `dev` base URL is JSONPlaceholder (`https://jsonplaceholder.typicode.com`).
- JSONPlaceholder accepts most POST payloads and returns `201` even for invalid data. Tests are written accordingly.

## CI
The GitHub Actions workflow runs:
1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npx playwright test`

## Status Badge
![Playwright API Tests](https://github.com/prasad291024/playwright-api-automation-framework/actions/workflows/playwright-api.yml/badge.svg)

## License
MIT License

## Author
Prasad
