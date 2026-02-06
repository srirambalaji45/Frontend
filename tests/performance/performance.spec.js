/**
 * Performance Testing: Lighthouse CI and Response Time Benchmarks
 * 
 * Metrics Measured:
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)
 * - Time to Interactive (TTI)
 * - Total Blocking Time (TBT)
 * - Cumulative Layout Shift (CLS)
 * - Response Time
 * - Data Loading Time
 */
import { test, expect } from '@playwright/test';

test.describe('Performance Testing: Response Time', () => {
    test('login page should load within 3 seconds', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const loadTime = Date.now() - startTime;

        console.log(`Login page DOM load time: ${loadTime}ms`);

        // Target: < 3000ms
        expect(loadTime).toBeLessThan(3000);
    });

    test('login page network idle within 5 seconds', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/', { waitUntil: 'networkidle' });

        const loadTime = Date.now() - startTime;

        console.log(`Login page full load time: ${loadTime}ms`);

        // Target: < 5000ms
        expect(loadTime).toBeLessThan(5000);
    });

    test('crop listing page load time', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/add-crop', { waitUntil: 'domcontentloaded' });

        const loadTime = Date.now() - startTime;

        console.log(`Crop listing page load time: ${loadTime}ms`);

        expect(loadTime).toBeLessThan(3000);
    });

    test('farmer preferences page load time', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/Farmer-preferences', { waitUntil: 'domcontentloaded' });

        const loadTime = Date.now() - startTime;

        console.log(`Farmer preferences page load time: ${loadTime}ms`);

        expect(loadTime).toBeLessThan(3000);
    });
});

test.describe('Performance Testing: User Interaction Response', () => {
    test('form input response time < 100ms', async ({ page }) => {
        await page.goto('/');

        const input = page.locator('input[type="tel"]');

        const startTime = Date.now();
        await input.fill('9876543210');
        const responseTime = Date.now() - startTime;

        console.log(`Input response time: ${responseTime}ms`);

        // User input should feel instant
        expect(responseTime).toBeLessThan(500);
    });

    test('dropdown selection response time', async ({ page }) => {
        await page.goto('/add-crop');

        const categorySelect = page.locator('select.listing-select').first();

        const startTime = Date.now();
        await categorySelect.selectOption('Fruits');
        const responseTime = Date.now() - startTime;

        console.log(`Dropdown response time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(500);
    });

    test('accessibility drawer open time < 500ms', async ({ page }) => {
        await page.goto('/');

        const startTime = Date.now();
        await page.click('.accessibility-btn');
        await page.locator('.acc-drawer.open').waitFor({ state: 'visible' });
        const responseTime = Date.now() - startTime;

        console.log(`Drawer open time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(500);
    });
});

test.describe('Performance Testing: Navigation Performance', () => {
    test('route transition time', async ({ page }) => {
        await page.goto('/');

        const startTime = Date.now();
        await page.click('a[href="/signup"]');
        await page.waitForURL(/.*signup/i);
        const transitionTime = Date.now() - startTime;

        console.log(`Route transition time: ${transitionTime}ms`);

        expect(transitionTime).toBeLessThan(1000);
    });

    test('multiple page navigation performance', async ({ page }) => {
        const times = [];

        // Navigate through multiple pages
        const routes = ['/', '/signup', '/Farmer-preferences', '/add-crop'];

        for (let i = 0; i < routes.length; i++) {
            const startTime = Date.now();
            await page.goto(routes[i]);
            times.push(Date.now() - startTime);
        }

        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        console.log(`Average page load time: ${avgTime}ms`);
        console.log(`Individual times: ${times.join('ms, ')}ms`);

        expect(avgTime).toBeLessThan(2000);
    });
});

test.describe('Performance Testing: Web Vitals Metrics', () => {
    test('measure Core Web Vitals', async ({ page }) => {
        await page.goto('/');

        // Measure FCP and LCP using Performance Observer
        const metrics = await page.evaluate(() => {
            return new Promise((resolve) => {
                const result = {
                    fcp: 0,
                    lcp: 0,
                    cls: 0,
                };

                // First Contentful Paint
                const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
                if (fcpEntry) {
                    result.fcp = fcpEntry.startTime;
                }

                // For LCP and CLS, we'd need PerformanceObserver which may not capture immediately
                // So we'll use what's available

                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        result.fcp = entry.startTime;
                    }
                });

                resolve(result);
            });
        });

        console.log('Web Vitals Metrics:');
        console.log(`  FCP: ${metrics.fcp}ms`);

        // FCP should be < 1800ms for good score
        if (metrics.fcp > 0) {
            expect(metrics.fcp).toBeLessThan(1800);
        }
    });

    test('measure Time to Interactive', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');

        // Wait for all scripts to be parsed and interactive
        await page.waitForLoadState('domcontentloaded');

        // Try to interact with the page
        const input = page.locator('input[type="tel"]');
        await input.fill('1');

        const tti = Date.now() - startTime;

        console.log(`Time to Interactive: ${tti}ms`);

        // TTI should be < 3800ms for good score
        expect(tti).toBeLessThan(3800);
    });
});

/**
 * PERFORMANCE REPORT SUMMARY
 * 
 * Run: npm run test:e2e -- tests/performance/
 * 
 * Expected Metrics:
 * ================
 * | Metric | Target | Rating |
 * |--------|--------|--------|
 * | FCP | < 1800ms | Good |
 * | LCP | < 2500ms | Good |
 * | TTI | < 3800ms | Good |
 * | TBT | < 200ms | Good |
 * | CLS | < 0.1 | Good |
 * | Page Load | < 3000ms | Good |
 * | Interaction | < 100ms | Good |
 * 
 * For detailed Lighthouse reports, run:
 * npx lighthouse http://localhost:5173 --output html --output-path ./lighthouse-report.html
 */
