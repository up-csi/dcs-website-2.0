import { test, expect } from '@playwright/test';
import { parse } from 'valibot';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/events';

test.describe('Directus Collections', () => {
	test('Global', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/global`);
		expect(test_request.ok()).toBeTruthy();
		expect(parse(Global, (await test_request.json()).data)).toBeTruthy();
	});

	test('Home', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/home`);
		expect(test_request.ok()).toBeTruthy();
	});

	test('Events', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/events`);
		expect(test_request.ok()).toBeTruthy();
		expect(parse(Events, (await test_request.json()).data)).toBeTruthy();
	});

	test('People', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/people`);
		expect(test_request.ok()).toBeTruthy();
	});

	test.describe('Students', () => {
		test('Overview', async ({ request }) => {
			const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/students`);
			expect(test_request.ok()).toBeTruthy();
		});
	});

	test('Publications', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/publications`);
		expect(test_request.ok()).toBeTruthy();
	});

	test('Organizations', async ({ request }) => {
		const test_request = await request.get(
			`${process.env.PUBLIC_APIURL}/items/student_organizations`
		);
		expect(test_request.ok()).toBeTruthy();
	});

	test('Laboratories', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/laboratories`);
		expect(test_request.ok()).toBeTruthy();
	});

	test('Alumni', async ({ request }) => {
		const test_request = await request.get(`${process.env.PUBLIC_APIURL}/items/alumni`);
		expect(test_request.ok()).toBeTruthy();
	});
});
