import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import { finished } from 'stream/promises';

async function downloadData(url: string, file_name: string) {
	return fetch(url)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject(`Fetch failed with status: ${res.status}`);
			}

			const content_type = res.headers.get('content-type');
			if (!content_type) {
				return Promise.reject('Missing content-type header.');
			}

			const extension = content_type.split('/').pop();
			if (!extension) {
				return Promise.reject('Unable to determine file extension.');
			}

			const path = `./static/${file_name}.${extension}`;
			const file_stream = createWriteStream(path);

			return finished(
				Readable.fromWeb(res.body as ReadableStream<Uint8Array>).pipe(file_stream)
			).then(() => path); // Return the file path when complete
		})
		.catch(() => {
			return null; // Return `null` if any error occurs
		});
}

export default downloadData;
