import { redirect } from '@sveltejs/kit';
import { openBook, closeBook, parsePage } from '#lib/utils.ts';

export const actions = {
	goto: async ({ request, params }) => {
		const data = await request.formData();
		const book = openBook(params.book);
		const page = parsePage(data);

		book.pages.push(page);
		closeBook(book);
		redirect(303, book.name + '/' + page.id);
	},

	updateText: async({ request, params }) => {
		const data = await request.formData();
		const book = openBook(params.book);
		
		book.text = data.get('text') as string;
		closeBook(book);
	}
};
