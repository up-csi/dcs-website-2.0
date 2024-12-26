import { test, expect } from '@playwright/test';

const EXPECTED_SITE_TITLE = 'UP Diliman - Department of Computer Science';

test.describe('2-4: Navigation Bar Links to Home', () => {
	test('Check for home button in navbar', async ({ page }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const home = await nav.getByRole('link', { name: 'Home' });
		await home.click();
		await page.waitForTimeout(5000);
		expect(await page.title()).toBe(EXPECTED_SITE_TITLE);
	});
});

test.describe('2-5: Navigation Bar Links to Events', () => {
	test('Check for button linking to page with route events', async ({ page }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const events = await nav.getByRole('link', { name: 'Events' });
		await events.click();
		await page.waitForTimeout(5000);
		expect(await page.url()).toContain('events');
	})
});

test.describe('2-6: Navigation Bar Links to Alumni', () => {});

test.describe('2-7: Navigation Bar Links to People', () => {});

test.describe('2-12: Navigation Bar Links to About, with dropdowns to subpages', () => {});
