# Ui Test Summary

## Overview

| Metric | Value |
|--------|-------|
| Total Tests | 64 |
| Passed | ✅ 46 |
| Failed | ❌ 18 |
| Skipped | ⏭️ 0 |
| Success Rate | 71.88% |
| Total Duration | 187.99s |
| Avg Duration | 2937.39ms |

## ❌ Failed Tests

### 1. should display table correctly when preferences added [chromium]

**Duration:** 44964ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 2. should display table correctly when preferences added [firefox]

**Duration:** 31487ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 3. should display table correctly when preferences added [mobile-chrome]

**Duration:** 40950ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 4. should display table correctly when preferences added [tablet]

**Duration:** 35053ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 5. should close on backdrop click [mobile-chrome]

**Duration:** 38475ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 6. should persist theme on page reload [tablet]

**Duration:** 26899ms

**Error:**
```
Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m

Expected: [32m"dark"[39m
Received: [31mnull[39m
```

### 7. login page visual snapshot [chromium]

**Duration:** 4942ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/login-page-chromium-linux.png, writing actual.
```

### 8. crop listing form visual snapshot [chromium]

**Duration:** 2769ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/crop-listing-form-chromium-linux.png, writing actual.
```

### 9. farmer preferences visual snapshot [chromium]

**Duration:** 2614ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/farmer-preferences-chromium-linux.png, writing actual.
```

### 10. login page visual snapshot [firefox]

**Duration:** 32326ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 11. crop listing form visual snapshot [firefox]

**Duration:** 33357ms

**Error:**
```
[31mTest timeout of 30000ms exceeded.[39m
```

### 12. farmer preferences visual snapshot [firefox]

**Duration:** 6843ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/farmer-preferences-firefox-linux.png, writing actual.
```

### 13. login page visual snapshot [mobile-chrome]

**Duration:** 8771ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/login-page-mobile-chrome-linux.png, writing actual.
```

### 14. crop listing form visual snapshot [mobile-chrome]

**Duration:** 6285ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/crop-listing-form-mobile-chrome-linux.png, writing actual.
```

### 15. farmer preferences visual snapshot [mobile-chrome]

**Duration:** 5144ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/farmer-preferences-mobile-chrome-linux.png, writing actual.
```

### 16. login page visual snapshot [tablet]

**Duration:** 14723ms

**Error:**
```
Error: [2mexpect([22m[31mpage[39m[2m).[22mtoHaveScreenshot[2m([22m[32mexpected[39m[2m)[22m failed

Timeout: 5000ms
  Timeout 5000ms exceeded.

  Snapshot: login-page.png

Call log:
[2m  - Expect "toHaveScreenshot(login-page.png)" with timeout 5000ms[22m
[2m    - generating new stable screenshot expectation[22m
[2m  - taking page screenshot[22m
[2m    - disabled all CSS animations[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m
[2m  - waiting 100ms bef...
```

### 17. crop listing form visual snapshot [tablet]

**Duration:** 7028ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/crop-listing-form-tablet-linux.png, writing actual.
```

### 18. farmer preferences visual snapshot [tablet]

**Duration:** 6632ms

**Error:**
```
Error: A snapshot doesn't exist at /home/akash-krishnan/Documents/sriram/Frontend/tests/ui/visual-regression.spec.js-snapshots/farmer-preferences-tablet-linux.png, writing actual.
```

## 🐌 Slowest Tests

| Test | Duration |
|------|----------|
| should display table correctly when preferences added [chromium] | 44964ms |
| should display table correctly when preferences added [mobile-chrome] | 40950ms |
| should close on backdrop click [mobile-chrome] | 38475ms |
| should display table correctly when preferences added [tablet] | 35053ms |
| crop listing form visual snapshot [firefox] | 33357ms |

## 📋 All Tests

| Test | Status | Duration |
|------|--------|----------|
| should have proper mobile layout (375px) [chromium] | ✅ passed | 3100ms |
| should have proper tablet layout (768px) [chromium] | ✅ passed | 3361ms |
| should have proper desktop layout (1440px) [chromium] | ✅ passed | 4103ms |
| should display logo correctly [chromium] | ✅ passed | 3495ms |
| should have visible form elements [chromium] | ✅ passed | 3463ms |
| should have proper mobile layout (375px) [firefox] | ✅ passed | 15342ms |
| should have proper tablet layout (768px) [firefox] | ✅ passed | 13966ms |
| should have proper desktop layout (1440px) [firefox] | ✅ passed | 18909ms |
| should display logo correctly [firefox] | ✅ passed | 16517ms |
| should have visible form elements [firefox] | ✅ passed | 18584ms |
| should have proper mobile layout (375px) [mobile-chrome] | ✅ passed | 10601ms |
| should have proper tablet layout (768px) [mobile-chrome] | ✅ passed | 12032ms |
| should have proper desktop layout (1440px) [mobile-chrome] | ✅ passed | 18219ms |
| should display logo correctly [mobile-chrome] | ✅ passed | 5886ms |
| should have visible form elements [mobile-chrome] | ✅ passed | 8458ms |
| should have proper mobile layout (375px) [tablet] | ✅ passed | 11320ms |
| should have proper tablet layout (768px) [tablet] | ✅ passed | 10764ms |
| should have proper desktop layout (1440px) [tablet] | ✅ passed | 12297ms |
| should display logo correctly [tablet] | ✅ passed | 15325ms |
| should have visible form elements [tablet] | ✅ passed | 14381ms |
| should display form properly on mobile [chromium] | ✅ passed | 2347ms |
| should display form properly on tablet [chromium] | ✅ passed | 1355ms |
| should display form properly on mobile [firefox] | ✅ passed | 9534ms |
| should display form properly on tablet [firefox] | ✅ passed | 10264ms |
| should display form properly on mobile [mobile-chrome] | ✅ passed | 4769ms |
| should display form properly on tablet [mobile-chrome] | ✅ passed | 7877ms |
| should display form properly on mobile [tablet] | ✅ passed | 12498ms |
| should display form properly on tablet [tablet] | ✅ passed | 12092ms |
| should display table correctly when preferences added [chromium] | ❌ failed | 44964ms |
| should display table correctly when preferences added [firefox] | ❌ failed | 31487ms |
| should display table correctly when preferences added [mobile-chrome] | ❌ failed | 40950ms |
| should display table correctly when preferences added [tablet] | ❌ failed | 35053ms |
| should open drawer with animation [chromium] | ✅ passed | 3141ms |
| should display all accessibility options [chromium] | ✅ passed | 3281ms |
| should close on backdrop click [chromium] | ✅ passed | 4279ms |
| should open drawer with animation [firefox] | ✅ passed | 7471ms |
| should display all accessibility options [firefox] | ✅ passed | 7849ms |
| should close on backdrop click [firefox] | ✅ passed | 8698ms |
| should open drawer with animation [mobile-chrome] | ✅ passed | 10408ms |
| should display all accessibility options [mobile-chrome] | ✅ passed | 9782ms |
| should close on backdrop click [mobile-chrome] | ❌ failed | 38475ms |
| should open drawer with animation [tablet] | ✅ passed | 19041ms |
| should display all accessibility options [tablet] | ✅ passed | 17118ms |
| should close on backdrop click [tablet] | ✅ passed | 25847ms |
| should apply dark theme correctly [chromium] | ✅ passed | 3461ms |
| should persist theme on page reload [chromium] | ✅ passed | 3808ms |
| should apply dark theme correctly [firefox] | ✅ passed | 9078ms |
| should persist theme on page reload [firefox] | ✅ passed | 9467ms |
| should apply dark theme correctly [mobile-chrome] | ✅ passed | 11388ms |
| should persist theme on page reload [mobile-chrome] | ✅ passed | 12337ms |
| should apply dark theme correctly [tablet] | ✅ passed | 24634ms |
| should persist theme on page reload [tablet] | ❌ failed | 26899ms |
| login page visual snapshot [chromium] | ❌ failed | 4942ms |
| crop listing form visual snapshot [chromium] | ❌ failed | 2769ms |
| farmer preferences visual snapshot [chromium] | ❌ failed | 2614ms |
| login page visual snapshot [firefox] | ❌ failed | 32326ms |
| crop listing form visual snapshot [firefox] | ❌ failed | 33357ms |
| farmer preferences visual snapshot [firefox] | ❌ failed | 6843ms |
| login page visual snapshot [mobile-chrome] | ❌ failed | 8771ms |
| crop listing form visual snapshot [mobile-chrome] | ❌ failed | 6285ms |
| farmer preferences visual snapshot [mobile-chrome] | ❌ failed | 5144ms |
| login page visual snapshot [tablet] | ❌ failed | 14723ms |
| crop listing form visual snapshot [tablet] | ❌ failed | 7028ms |
| farmer preferences visual snapshot [tablet] | ❌ failed | 6632ms |
