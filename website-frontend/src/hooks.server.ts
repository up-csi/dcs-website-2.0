export async function handle({ event, resolve }) {
	return await resolve(event, {
		filterSerializedResponseHeaders: (key) => {
			return key.toLowerCase() === 'content-type';
		}
	});
}
