import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Directus Authentication', async ({ request }) => {
	await request.post(`${process.env.PUBLIC_APIURL}/auth/login`, {
		data: {
			email: process.env.EMAIL as string,
			password: process.env.PASSWORD as string,
			mode: 'session'
		}
	});
	await request.storageState({ path: authFile });
});
