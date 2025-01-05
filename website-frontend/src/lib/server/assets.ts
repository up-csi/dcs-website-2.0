import downloadData from './download';

async function obtainAssets(asset_urls: object) {
	const assets = await Promise.allSettled(
		Object.entries(asset_urls).map(([key, url]) =>
			downloadData(url, key).then((path) => [key, path])
		)
	).then((results) =>
		Object.fromEntries(
			results.map((result, index) => {
				const key = Object.keys(asset_urls)[index];
				if (result.status === 'fulfilled') {
					return result.value;
				} else {
					return [key, null];
				}
			})
		)
	);

	// Ensure fallbacks for undefined assets
	Object.keys(asset_urls).forEach((key) => {
		if (!assets[key]) {
			assets[key] = '/default/path/to/fallback.png'; // Replace with actual fallback
		}
	});

	return assets;
}

export default obtainAssets;
