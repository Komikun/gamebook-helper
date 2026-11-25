import { fail, redirect } from '@sveltejs/kit';
import fs from 'node:fs';
import { emptyBook } from '#lib/utils.js';


export function load() {
	const books = fs
		.readdirSync('static/')
		.filter((name) => name.endsWith('.book'))
		.map((name) => name.substring(0, name.length-5));

	return {
		books
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const filename = 'static/' + data.get('name') + '.book';
		if (fs.existsSync(filename)) {
			return fail(400, {
				error: 'Book already exists.'
			});
		}
		try {
            const book = Object.assign({}, emptyBook(), { name: data.get('name')})
			fs.writeFileSync(filename, JSON.stringify(book));
		} catch {
			return fail(400, {
				error: 'Cannot create book, try different name.'
			});
		}
        redirect(303, '/' + data.get('name'));
	}
};
