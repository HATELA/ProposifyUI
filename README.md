# Playwright Page Object Model Framework

This repository has automated testing framework built with Playwright, using the Page Object Model design pattern.

## Features
- Page Object Model (POM) architecture
- Multiple reporting formats (HTML, JUnit, custom JSON)
- GitHub Actions CI/CD integration
- Test data management
- Helper utilities
- Lightweight custom reporter

### Prereq
- Node.js (v16 or higher)
- npm (v8 or higher)

### How to install
1. Clone the repository
   git clone https://github.com/HATELA/ProposifyUI
   cd ProposifyUI

2. Install dependencies
   npm install

3. Install Playwright browsers
   npx playwright install

### Environment Setup
Create a `.env` file in the root directory with the following variables:
BASE_URL=https://app.env9.proposify.link
TEST_EMAIL=$email
TEST_PASSWORD=$password


### Run all tests
npm test

### Run tests with UI mode
npm run test:ui

### Run tests in headed mode
npm run test:headed

### Run tests in debug mode
npm run test:debug


## Project Structure

- **`page-objects/`**: Contains page object classes
  - `PageBase.ts`: Base class with common methods
  - `LoginPage.ts`: Login page object
  - `Dashboard.ts`: Dashboard page object
  - `CreateDocumentPage.ts`: Create document page object 

- **`tests/`**: Test files
  - `auth.spec.ts`: Authentication tests
  - `dashboard.spec.ts`: Dashboard functionality tests

- **`fixtures/`**: Test data
  - `test-data.json`: Test data for different scenarios

- **`utils/`**: Helper utilities
  - `test-helpers.ts`: Common helper functions
  - `custom-reporter.ts`: Custom test reporter

- **`.github/workflows/`**: CI/CD configuration
  - `playwright.yml`: GitHub Actions workflow

## Reporting

After running the tests, reports can be found in the `test-results` directory:

- HTML report: `test-results/html-report/`
- JUnit XML: `test-results/junit-results.xml`
- Custom JSON report: `test-results/custom-report.json`

To open the HTML report:

```
npm run report
```

## CI/CD Integration

This framework includes GitHub Actions workflow configuration for continuous integration. Tests will automatically run on:

- Pushes to main/master branch
- Pull requests to main/master branch
- Daily schedule at midnight UTC

## Best Practices

1. Keep page objects focused on a single page or component
2. Use descriptive test names
3. Tag tests appropriately (e.g., @smoke, @regression)
4. Maintain test data in fixture files
5. Use the Base Page for common functionality
6. Follow the AAA pattern (Arrange, Act, Assert) in tests
7. Keep selectors updated when the application changes

## Contributing

1. Create a new branch for your feature
2. Add your changes
3. Write or update tests
4. Create a pull request

## License

This project is licensed under the MIT License.