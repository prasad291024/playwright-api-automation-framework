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
|-- Jenkinsfile
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
### GitHub Actions
The GitHub Actions workflow is split into staged jobs:
1. `setup`
2. `lint`
3. `typecheck`
4. `test`

Each run installs dependencies, validates code quality, executes Playwright API tests, and uploads the HTML report as an artifact.

### Jenkins
The repository also includes a [Jenkinsfile](./Jenkinsfile) for Jenkins-based CI on a Windows agent.

The Jenkins pipeline runs:
1. `Checkout`
2. `Install`
3. `Lint`
4. `Typecheck`
5. `Test`
6. `Publish Report`

### Slack Notifications
Jenkins is configured to send Slack notifications for build success and failure.

Slack messages include:
- job name
- build number
- branch
- failing stage on failure
- Jenkins build URL
- Playwright report URL

## Recent Updates
- Cross-platform npm test scripts using `cross-env`
- TypeScript, ESLint, and Prettier tooling baseline
- Unified environment configuration in `config/env.ts`
- CI quality gates in GitHub Actions (`lint` and `typecheck`)
- Jenkins pipeline support with HTML report publishing
- Slack notification support for Jenkins builds
- Cleanup of empty placeholder files

## Status Badge
![Playwright API Tests](https://github.com/prasad291024/playwright-api-automation-framework/actions/workflows/playwright-api.yml/badge.svg)

## License
MIT License

## Author
Prasad
