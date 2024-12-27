import { test, expect } from '@playwright/test';

test.describe('2-4: Navigation Bar Links to Home', () => {
	test('Check for home button in navbar', async ({ page, request }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const home = await nav.getByRole('link', { name: 'Home' });
		await home.click();
		await page.waitForTimeout(5000);
		const res = await request.get(`${process.env.PUBLIC_APIURL}/items/global`);
		const global_title = await res.json().then((obj) => {
			return obj.data.title;
		});
		expect(await page.title()).toBe(global_title);
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
	});
});

test.describe('2-6: Navigation Bar Links to Alumni', () => {
	test('Check for button linking to page with route alumni', async ({ page }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const alumni = await nav.getByRole('link', { name: 'Alumni' });
		await alumni.click();
		await page.waitForTimeout(5000);
		expect(await page.url()).toContain('alumni');
	});
});

test.describe('2-7: Navigation Bar Links to People', () => {
	test('Check for button linking to page with route people', async ({ page }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const people = await nav.getByRole('link', { name: 'People' });
		await people.click();
		await page.waitForTimeout(5000);
		expect(await page.url()).toContain('people');
	});
});

test.describe('2-12: Navigation Bar Links to About, with dropdowns to subpages', () => {
	test('Check for button linking to page with route about', async ({ page }) => {
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const about = await nav.getByRole('link', { name: 'About' });
		await about.click();
		await page.waitForTimeout(5000);
		expect(await page.url()).toContain('about');
	});

	test('Check on hover of about button opening dropdown', async ({ page, browserName }) => {
		test.skip(browserName == 'chromium', 'this test will not work on chromium for some reason');
		await page.goto('/');
		const nav = await page.getByRole('navigation');
		const about = await nav.getByRole('link', { name: 'About' });
		const overview = await page.getByRole('link', { name: 'Overview' });
		const history = await page.getByRole('link', { name: 'History' });
		await about.hover();
		await expect(overview).toBeVisible();
		await expect(history).toBeVisible();
	});
});
