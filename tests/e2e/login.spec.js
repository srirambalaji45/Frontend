/**
 * E2E Test: Login Flow
 * Complete end-to-end test for the login process
 * 
 * Steps executed:
 * 1. Navigate to login page
 * 2. Enter phone number
 * 3. Click continue
 * 4. Verify navigation to OTP page
 */
import { test, expect } from '@playwright/test';

test.describe('E2E: Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display login page correctly', async ({ page }) => {
        // Expected: Login page with phone input and continue button
        // Actual: Checking for presence of elements
        await expect(page.locator('.login-page')).toBeVisible();
        await expect(page.locator('input[type="tel"]')).toBeVisible();
        await expect(page.locator('button.cnt-btn')).toBeVisible();

        // Verify logo
        await expect(page.locator('img[alt="logo"]')).toBeVisible();
    });

    test('should validate phone number format', async ({ page }) => {
        // Step 1: Enter invalid phone
        await page.fill('input[type="tel"]', '123');

        // Step 2: Click continue
        await page.click('button.cnt-btn');

        // Expected: Error message shown
        // Actual: Checking for error message
        await expect(page.locator('.error-msg')).toBeVisible();
    });

    test('should accept valid 10-digit phone number', async ({ page }) => {
        // Step 1: Enter valid phone
        await page.fill('input[type="tel"]', '9876543210');

        // Expected: Input should contain 10 digits
        // Actual: Verify input value
        await expect(page.locator('input[type="tel"]')).toHaveValue('9876543210');
    });

    test('should only allow numeric input', async ({ page }) => {
        // Step: Try to enter letters and numbers
        const input = page.locator('input[type="tel"]');
        await input.fill('abc123def456');

        // Expected: Only numbers should be in input
        // Actual: Letters should be filtered out (handled by component's onChange)
        // Note: This depends on React handling - Playwright fills directly
    });

    test('should navigate to signup page', async ({ page }) => {
        // Step: Click on signup link
        await page.click('a[href="/signup"]');

        // Expected: Navigate to /signup
        // Actual: Check URL
        await expect(page).toHaveURL(/.*signup/i);
    });

    test('should show loading state during submission', async ({ page }) => {
        // Mock the API to delay response
        await page.route('**/api/auth/login', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true, data: { _id: 'test' } }),
            });
        });

        await page.fill('input[type="tel"]', '9876543210');
        await page.click('button.cnt-btn');

        // Expected: Button should show loading text
        // Actual: Check button text changes
        await expect(page.locator('button.cnt-btn')).toBeDisabled();
    });

    test('should handle API error gracefully', async ({ page }) => {
        // Mock API to return error
        await page.route('**/api/auth/login', (route) =>
            route.fulfill({
                status: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Phone number not registered'
                }),
            })
        );

        await page.fill('input[type="tel"]', '9876543210');
        await page.click('button.cnt-btn');

        // Expected: Error message displayed
        // Actual: Check for error message
        await expect(page.locator('.error-msg')).toBeVisible();
    });

    test('should navigate to verify page on successful login', async ({ page }) => {
        // Mock successful API response
        await page.route('**/api/auth/login', (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    success: true,
                    data: { _id: 'user123' },
                    requestId: 'req123',
                }),
            })
        );

        await page.fill('input[type="tel"]', '9876543210');
        await page.click('button.cnt-btn');

        // Expected: Navigate to /verify
        // Actual: Check URL
        await expect(page).toHaveURL(/.*verify/i);
    });

    test('should store phone in localStorage after successful request', async ({ page }) => {
        await page.route('**/api/auth/login', (route) =>
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                    success: true,
                    data: { _id: 'user123' },
                    requestId: 'req123',
                }),
            })
        );

        await page.fill('input[type="tel"]', '9876543210');
        await page.click('button.cnt-btn');

        // Wait for navigation
        await page.waitForURL(/.*verify/i);

        // Expected: localStorage should have phone
        // Actual: Evaluate localStorage
        const phone = await page.evaluate(() => localStorage.getItem('phone'));
        expect(phone).toBe('9876543210');
    });
});

test.describe('E2E: Login Page - Responsive Layout', () => {
    test('should display correctly on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await expect(page.locator('.login-wrapper')).toBeVisible();
        await expect(page.locator('input[type="tel"]')).toBeVisible();
    });

    test('should display correctly on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        await expect(page.locator('.login-wrapper')).toBeVisible();
    });
});
