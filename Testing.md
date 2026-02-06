# Test Suite Documentation

## Overview
This project contains a comprehensive test suite covering E2E, UI, Performance, Integration, Functional, and Regression testing.

## Test Folder Structure

### `test-reports/` - JSON Test Reports (703 KB total)
Contains machine-readable JSON output reports from all test suites:

| File | Size | Description |
|------|------|-------------|
| `e2e-results.json` | 229 KB | End-to-end test results from Playwright |
| `functional.json` | 6 KB | Functional test results from Vitest |
| `integration.json` | 168 KB | Integration test results from Vitest |
| `performance.json` | 148 KB | Performance test results from Playwright |
| `regression.json` | 3 KB | Regression test results from Vitest |
| `ui.json` | 145 KB | UI/visual regression test results from Playwright |

### `test-results/` - Playwright Test Artifacts
Contains Playwright test artifacts for failed/flaky tests (automatically generated):

**Contents:**
- Test failure screenshots (PNG)
- Video recordings of test runs (WebM)
- Error context markdown files
- `.last-run.json` - Metadata about the last Playwright run

**Subdirectory Patterns:**
- `performance-performance-Pe-*` - Performance test artifacts
- `ui-visual-regression-UI-Te-*` - UI regression test artifacts

> **Note:** This folder is gitignored as it contains large binary files that are regenerated on each test run.

### `test_output/` - Structured Test Outputs
Organized test outputs by category with summaries, results, and artifacts:

```
test_output/
├── summary.md                    # Overall test summary
├── e2e/
│   ├── e2e_test_results.txt
│   ├── results.json
│   ├── summary.html
│   └── summary.md
├── functional/
│   ├── functional_test_results.txt
│   ├── results.json
│   ├── summary.html
│   └── summary.md
├── integration/
│   ├── integration_test_results.txt
│   ├── results.json
│   ├── summary.html
│   └── summary.md
├── performance/
│   ├── artifacts/
│   │   ├── screenshots/
│   │   └── videos/
│   ├── performance_test_results.txt
│   ├── results.json
│   ├── summary.html
│   └── summary.md
├── regression/
│   ├── regression_test_results.txt
│   ├── results.json
│   ├── summary.html
│   └── summary.md
└── ui/
    ├── artifacts/
    │   ├── screenshots/
    │   └── videos/
    ├── ui_test_results.txt
    ├── results.json
    ├── summary.html
    └── summary.md
```

### `tests/` - Test Source Files

```
tests/
├── setup.js                      # Global test setup
├── e2e/
│   ├── farmer-preferences.spec.js
│   └── login.spec.js
├── functional/
│   ├── CropListingForm.test.jsx
│   └── Login.test.jsx
├── integration/
│   ├── accessibility-i18n.test.jsx
│   └── auth-flow.test.jsx
├── performance/
│   └── performance.spec.js
├── regression/
│   └── baseline.test.jsx
└── ui/
    ├── visual-regression.spec.js
    └── visual-regression.spec.js-snapshots/
        ├── crop-listing-form-*.png
        ├── farmer-preferences-*.png
        └── login-page-*.png
```

## Running Tests

### All Tests
```bash
# Run all test suites
npm test

# Run tests with coverage
npm run test:coverage
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui

# Show E2E test report
npm run test:e2e:report
```

### Functional & Integration Tests (Vitest)
```bash
# Run once
npm run test:run

# Watch mode
npm test
```

### Regression Tests
```bash
npm run test:regression
```

### UI & Performance Tests
```bash
# UI tests (Playwright)
npx playwright test tests/ui

# Performance tests (Playwright)
npx playwright test tests/performance
```

## Test Coverage

### E2E Tests
- **Login flow** - User authentication journey
- **Farmer preferences** - Category and crop selection, table management

### Functional Tests
- **Login component** - Form validation, accessibility
- **CropListingForm** - Form interactions, dropdown selections

### Integration Tests
- **Accessibility & i18n** - Theme switching, language selection
- **Auth flow** - Complete authentication integration

### Performance Tests
- Page load times (< 3s for DOM, < 5s for network idle)
- User interaction response (< 500ms)
- Navigation performance (< 1s route transitions)
- Core Web Vitals (FCP, LCP, TTI, CLS)

### UI Tests
- Responsive layouts (mobile 375px, tablet 768px, desktop 1440px)
- Visual regression snapshots
- Theme persistence
- Accessibility drawer functionality

### Regression Tests
- Baseline functionality preservation
- Critical path validation

## Test Browsers

Tests run across multiple browsers and devices:
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **Mobile Chrome** (Pixel 5)
- **Tablet** (iPad gen 7)

## Configuration Files

- `playwright.config.js` - Playwright E2E/UI/Performance configuration
- `vitest.config.js` - Vitest Functional/Integration/Regression configuration
- `tests/setup.js` - Global test environment setup

## Viewing Test Results

### HTML Reports
Open the summary files in `test_output/`:
- Overall: `test_output/summary.md`
- By category: `test_output/{category}/summary.html`

### JSON Reports
Programmatic access via `test-reports/*.json`

### Playwright Report
```bash
npx playwright show-report
```

## CI/CD Integration

The test suite is configured for CI environments:
- Automatic retries (2x in CI)
- Single worker in CI mode
- Failure screenshots and videos
- JSON output for automation

## Notes

- **Screenshots** are captured only on test failures
- **Videos** are retained only for failed tests
- **Visual snapshots** are versioned per browser/device
- **Performance metrics** target Google's Core Web Vitals thresholds
