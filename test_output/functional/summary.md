# Functional Test Summary

## Overview

| Metric | Value |
|--------|-------|
| Total Tests | 16 |
| Passed | ✅ 15 |
| Failed | ❌ 1 |
| Skipped | ⏭️ 0 |
| Success Rate | 93.75% |
| Total Duration | 2.55s |
| Avg Duration | 159.66ms |

## ❌ Failed Tests

### 1. /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC008: enforces 10 digit maximum

**Duration:** 121.41497600000002ms

**Error:**
```
Error: [2mexpect([22m[31melement[39m[2m).toHaveValue([22m[32m1234567890[39m[2m)[22m

Expected the element to have value:
[32m  1234567890[39m
Received:
[31m  12345678901234[39m
    at Proxy.expectWrapper (file:///home/akash-krishnan/Documents/sriram/Frontend/node_modules/@vitest/expect/dist/index.js:1821:12)
    at Proxy.<anonymous> (file:///home/akash-krishnan/Documents/sriram/Frontend/node_modules/@vitest/expect/dist/index.js:1090:14)
    at Proxy.methodWrapper (file:///home/akas...
```

## 🐌 Slowest Tests

| Test | Duration |
|------|----------|
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC001: shows error for empty phone submission | 485.82229199999983ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC001: renders form with all required elements | 422.8642279999999ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC007: clears form after successful submission | 271.21947999999975ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC003: resets crop selection when category changes | 235.4816920000003ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC003: accepts exactly 10 digit phone number | 162.5663010000003ms |

## 📋 All Tests

| Test | Status | Duration |
|------|--------|----------|
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC001: renders form with all required elements | ✅ passed | 422.8642279999999ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC002: enables crop dropdown after category selection | ✅ passed | 150.95682999999963ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC003: resets crop selection when category changes | ✅ passed | 235.4816920000003ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC004: shows correct crops for selected category | ✅ passed | 98.75342300000011ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC005: quantity input has number type | ✅ passed | 12.162263000000166ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC006: price input has number type | ✅ passed | 8.298608999999942ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC007: clears form after successful submission | ✅ passed | 271.21947999999975ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/CropListingForm.test.jsx > Functional: CropListingForm Component > TC008: displays all crop categories | ✅ passed | 32.61560700000018ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC001: shows error for empty phone submission | ✅ passed | 485.82229199999983ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC002: shows error for phone number less than 10 digits | ✅ passed | 146.10345300000017ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC003: accepts exactly 10 digit phone number | ✅ passed | 162.5663010000003ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC004: filters non-numeric characters from input | ✅ passed | 107.26705300000003ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC005: displays API error message | ✅ passed | 132.90280600000006ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC006: shows loading state during submission | ✅ passed | 154.32721800000036ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC007: displays +91 country code | ✅ passed | 11.860595999999987ms |
| /home/akash-krishnan/Documents/sriram/Frontend/tests/functional/Login.test.jsx > Functional: Login Component > TC008: enforces 10 digit maximum | ❌ failed | 121.41497600000002ms |
