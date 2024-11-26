import { test, expect } from '@playwright/test';
import { parse } from 'valibot';
import { Global } from '$lib/models/global';
import { Events } from '$lib/models/event';

test('Global', async ({ request }) => {
	const global = await request.get(`${process.env.PUBLIC_APIURL}/items/global`);
	expect(global.ok()).toBeTruthy();
	expect(parse(Global, (await global.json()).data)).toBeTruthy();
});

test('Home', async ({ request }) => {
	const home = await request.get(`${process.env.PUBLIC_APIURL}/items/home`);
	expect(home.ok()).toBeTruthy();
});

test('Events', async ({ request }) => {
	const events = await request.get(`${process.env.PUBLIC_APIURL}/items/events`);
	expect(events.ok()).toBeTruthy();
	expect(parse(Events, (await events.json()).data)).toBeTruthy();
});

test('People', async ({ request }) => {
	const people = await request.get(`${process.env.PUBLIC_APIURL}/items/people`);
	expect(people.ok()).toBeTruthy();
});

test('Students', async ({ request }) => {
	const students = await request.get(`${process.env.PUBLIC_APIURL}/items/students`);
	expect(students.ok()).toBeTruthy();
});

test('Publications', async ({ request }) => {
	const publications = await request.get(`${process.env.PUBLIC_APIURL}/items/publications`);
	expect(publications.ok()).toBeTruthy();
});

test('Organizations', async ({ request }) => {
	const organizations = await request.get(`${process.env.PUBLIC_APIURL}/items/organizations`);
	expect(organizations.ok()).toBeTruthy();
});

test('Laboratories', async ({ request }) => {
	const laboratories = await request.get(`${process.env.PUBLIC_APIURL}/items/laboratories`);
	expect(laboratories.ok()).toBeTruthy();
});
