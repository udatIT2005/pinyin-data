import { pinyin } from 'pinyin-pro';

export default {
	async fetch(request) {
		const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers });
		}

		if (request.method !== 'POST') {
			return Response.json({ error: 'Please send a POST request with JSON.' }, { status: 405, headers });
		}

		try {
			const body = await request.json();

			if (typeof body.text !== 'string') {
				return Response.json({ error: 'The text field must be a string.' }, { status: 400, headers });
			}

			const result = pinyin(body.text, {
				toneType: 'symbol',
				type: 'array',
			});
			console.log(JSON.stringify(result));

			return Response.json({ pinyin: result.join(' ') }, { headers });
		} catch (error) {
			return Response.json({ error: 'Invalid JSON request.' }, { status: 400, headers });
		}
	},
};
