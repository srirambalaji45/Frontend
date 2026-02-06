/**
 * E2E Test: Farmer Preferences Flow
 * Complete end-to-end test for farmer preferences workflow
 * 
 * Steps executed:
 * 1. Navigate to preferences page
 * 2. Select category and crop
 * 3. Add preferences
 * 4. Continue to dashboard
 */
import { test, expect } from '@playwright/test';

test.describe('E2E: Farmer Preferences Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/Farmer-preferences');
    });

    test('should display preferences page correctly', async ({ page }) => {
        // Expected: Preferences page with category/crop selectors
        await expect(page.locator('.preferences-page')).toBeVisible();
        await expect(page.locator('select').first()).toBeVisible();
    });

    test('should allow selecting category and crop', async ({ page }) => {
        // Step 1: Select category
        const categorySelect = page.locator('select').first();
        await categorySelect.selectOption('Fruits');

        // Expected: Category selected
        await expect(categorySelect).toHaveValue('Fruits');

        // Step 2: Select crop
        const cropSelect = page.locator('select').nth(1);
        await expect(cropSelect).not.toBeDisabled();
        await cropSelect.selectOption('Mango');

        // Expected: Crop selected
        await expect(cropSelect).toHaveValue('Mango');
    });

    test('should add preference to table', async ({ page }) => {
        // Step 1 & 2: Select category and crop
        await page.locator('select').first().selectOption('Vegetables');
        await page.locator('select').nth(1).selectOption('Tomato');

        // Step 3: Click add button
        await page.click('.add-btn');

        // Expected: Preference appears in table
        // Actual: Check table row
        await expect(page.locator('.preferences-table tbody tr')).toHaveCount(1);
        await expect(page.locator('.preferences-table')).toContainText('Vegetables');
        await expect(page.locator('.preferences-table')).toContainText('Tomato');
    });

    test('should add multiple preferences', async ({ page }) => {
        // Add first preference
        await page.locator('select').first().selectOption('Fruits');
        await page.locator('select').nth(1).selectOption('Mango');
        await page.click('.add-btn');

        // Add second preference
        await page.locator('select').first().selectOption('Vegetables');
        await page.locator('select').nth(1).selectOption('Potato');
        await page.click('.add-btn');

        // Expected: Two rows in table
        await expect(page.locator('.preferences-table tbody tr')).toHaveCount(2);
    });

    test('should remove preference on remove button click', async ({ page }) => {
        // Add preference
        await page.locator('select').first().selectOption('Spices');
        await page.locator('select').nth(1).selectOption('Turmeric');
        await page.click('.add-btn');

        // Remove preference
        await page.click('.remove-btn');

        // Expected: Table should be empty
        await expect(page.locator('.preferences-table tbody tr')).toHaveCount(0);
    });

    test('should disable continue button when no preferences', async ({ page }) => {
        // Expected: Continue button should be disabled
        await expect(page.locator('.continue-btn')).toBeDisabled();
    });

    test('should enable continue button with preferences', async ({ page }) => {
        await page.locator('select').first().selectOption('Oilseeds');
        await page.locator('select').nth(1).selectOption('Mustard seed');
        await page.click('.add-btn');

        // Expected: Continue button should be enabled
        await expect(page.locator('.continue-btn')).not.toBeDisabled();
    });

    test('should navigate to dashboard on continue', async ({ page }) => {
        await page.locator('select').first().selectOption('Food Grains / Cereals');
        await page.locator('select').nth(1).selectOption('Wheat');
        await page.click('.add-btn');
        await page.click('.continue-btn');

        // Expected: Navigate to farmer dashboard
        await expect(page).toHaveURL(/.*farmer-dashboard/i);
    });

    test('should clear selections after adding preference', async ({ page }) => {
        await page.locator('select').first().selectOption('Fruits');
        await page.locator('select').nth(1).selectOption('Apple');
        await page.click('.add-btn');

        // Expected: Selects should be reset
        const categorySelect = page.locator('select').first();
        const cropSelect = page.locator('select').nth(1);

        await expect(categorySelect).toHaveValue('');
    });
});

test.describe('E2E: Crop Listing Form Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/add-crop');
    });

    test('should display crop listing form', async ({ page }) => {
        await expect(page.locator('.crop-listing-page')).toBeVisible();
        await expect(page.locator('.listing-title')).toBeVisible();
    });

    test('should select category and filter crops', async ({ page }) => {
        // Step 1: Select category
        const categorySelect = page.locator('select.listing-select').first();
        await categorySelect.selectOption('Fruits');

        // Step 2: Verify crop dropdown is enabled and has options
        const cropSelect = page.locator('select.listing-select').nth(1);
        await expect(cropSelect).not.toBeDisabled();

        // Select a fruit
        await cropSelect.selectOption('Banana');
        await expect(cropSelect).toHaveValue('Banana');
    });

    test('should submit form with valid data', async ({ page }) => {
        // Fill all fields
        await page.locator('select.listing-select').first().selectOption('Vegetables');
        await page.locator('select.listing-select').nth(1).selectOption('Tomato');
        await page.fill('input[placeholder*="uantity"]', '100');
        await page.fill('input[placeholder*="rice"]', '50');

        // Submit form
        await page.click('button[type="submit"]');

        // Expected: Form should reset (values cleared)
        await expect(page.locator('select.listing-select').first()).toHaveValue('');
    });

    test('should require all fields for submission', async ({ page }) => {
        // Try to submit without filling all fields
        await page.locator('select.listing-select').first().selectOption('Fruits');

        // Click submit - should not submit due to HTML5 validation
        await page.click('button[type="submit"]');

        // Form should still be on the page
        await expect(page.locator('.crop-listing-page')).toBeVisible();
    });
});
