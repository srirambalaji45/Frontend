/**
 * UI Testing: Visual Regression and Responsive Layout Tests
 * 
 * Layout Checking:
 * - Mobile (375px)
 * - Tablet (768px)
 * - Desktop (1440px)
 * 
 * Theme Testing:
 * - Light mode
 * - Dark mode
 */
import { test, expect } from '@playwright/test';

test.describe('UI Testing: Login Page Layout', () => {
    test('should have proper mobile layout (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Check main container is visible and not overflowing
        const loginPage = page.locator('.login-page');
        await expect(loginPage).toBeVisible();

        // Check form fits within viewport
        const loginWrapper = page.locator('.login-wrapper');
        const box = await loginWrapper.boundingBox();

        expect(box?.width).toBeLessThanOrEqual(375);
    });

    test('should have proper tablet layout (768px)', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        const loginWrapper = page.locator('.login-wrapper');
        await expect(loginWrapper).toBeVisible();
    });

    test('should have proper desktop layout (1440px)', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('/');

        const loginWrapper = page.locator('.login-wrapper');
        await expect(loginWrapper).toBeVisible();

        // Form should be centered on larger screens
        const box = await loginWrapper.boundingBox();
        const pageWidth = 1440;

        // Check rough centering (within 100px margin)
        const leftMargin = box?.x || 0;
        const rightMargin = pageWidth - (leftMargin + (box?.width || 0));
        expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(200);
    });

    test('should display logo correctly', async ({ page }) => {
        await page.goto('/');

        const logo = page.locator('img[alt="logo"]');
        await expect(logo).toBeVisible();

        // Logo should load without errors
        const logoSrc = await logo.getAttribute('src');
        expect(logoSrc).toBeTruthy();
    });

    test('should have visible form elements', async ({ page }) => {
        await page.goto('/');

        // Phone input
        await expect(page.locator('input[type="tel"]')).toBeVisible();

        // Submit button
        await expect(page.locator('button.cnt-btn')).toBeVisible();

        // Country code
        await expect(page.locator('.country-code')).toBeVisible();
    });
});

test.describe('UI Testing: CropListingForm Layout', () => {
    test('should display form properly on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/add-crop');

        const formCard = page.locator('.crop-listing-card');
        await expect(formCard).toBeVisible();

        // All inputs should be visible and usable
        await expect(page.locator('select.listing-select').first()).toBeVisible();
        await expect(page.locator('input.listing-input').first()).toBeVisible();
    });

    test('should display form properly on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/add-crop');

        await expect(page.locator('.crop-listing-page')).toBeVisible();
    });
});

test.describe('UI Testing: Farmer Preferences Layout', () => {
    test('should display table correctly when preferences added', async ({ page }) => {
        await page.goto('/Farmer-preferences');

        // Add a preference
        await page.locator('select').first().selectOption('Fruits');
        await page.locator('select').nth(1).selectOption('Mango');
        await page.click('.add-btn');

        // Table should be visible
        const table = page.locator('.preferences-table');
        await expect(table).toBeVisible();

        // Table should have proper structure
        await expect(page.locator('thead')).toBeVisible();
        await expect(page.locator('tbody tr')).toHaveCount(1);
    });
});

test.describe('UI Testing: Accessibility Drawer', () => {
    test('should open drawer with animation', async ({ page }) => {
        await page.goto('/');

        // Click accessibility button
        await page.click('.accessibility-btn');

        // Drawer should be visible with open class
        const drawer = page.locator('.acc-drawer');
        await expect(drawer).toHaveClass(/open/);
    });

    test('should display all accessibility options', async ({ page }) => {
        await page.goto('/');
        await page.click('.accessibility-btn');

        // Text size controls
        await expect(page.locator('text=A-')).toBeVisible();
        await expect(page.locator('text=A+')).toBeVisible();

        // Language selector
        await expect(page.locator('.acc-select')).toBeVisible();
    });

    test('should close on backdrop click', async ({ page }) => {
        await page.goto('/');
        await page.click('.accessibility-btn');

        // Click backdrop
        await page.click('.acc-backdrop');

        // Drawer should close
        const drawer = page.locator('.acc-drawer');
        await expect(drawer).not.toHaveClass(/open/);
    });
});

test.describe('UI Testing: Theme Switching', () => {
    test('should apply dark theme correctly', async ({ page }) => {
        await page.goto('/');
        await page.click('.accessibility-btn');

        // Get initial theme
        const initialTheme = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );

        // Toggle theme
        await page.click('.acc-toggle');

        // Theme attribute should change
        const newTheme = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );

        expect(newTheme).not.toBe(initialTheme);
    });

    test('should persist theme on page reload', async ({ page }) => {
        await page.goto('/');
        await page.click('.accessibility-btn');
        await page.click('.acc-toggle');

        const themeBeforeReload = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );

        await page.reload();

        const themeAfterReload = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme')
        );

        expect(themeAfterReload).toBe(themeBeforeReload);
    });
});

test.describe('UI Testing: Visual Regression', () => {
    test('login page visual snapshot', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Take screenshot for visual comparison
        await expect(page).toHaveScreenshot('login-page.png', {
            maxDiffPixels: 100,
        });
    });

    test('crop listing form visual snapshot', async ({ page }) => {
        await page.goto('/add-crop');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('crop-listing-form.png', {
            maxDiffPixels: 100,
        });
    });

    test('farmer preferences visual snapshot', async ({ page }) => {
        await page.goto('/Farmer-preferences');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot('farmer-preferences.png', {
            maxDiffPixels: 100,
        });
    });
});
