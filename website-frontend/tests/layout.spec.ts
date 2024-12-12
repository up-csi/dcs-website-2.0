import { test, expect } from "@playwright/test";

test.describe('2-4: Navigation Bar Links to Home', () => {
    test('Check for home button in navbar', async ({ page }) => {
        await page.goto("http://localhost:5173");
        const nav = await page.getByRole('navigation');
        const home = await nav.getByRole('link', {name: 'Home'});
        await home.click();
        expect(page.url()).toBe("http://localhost:5173/");
    })
})