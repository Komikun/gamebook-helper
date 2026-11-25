import { redirect } from '@sveltejs/kit';
import fs from 'node:fs';
import { closeBook, openBook } from '#lib/utils.ts';

export function load({ params }) {
	if (!fs.existsSync('static/' + params.book + '.book')) {
		redirect(307, '/');
	}
	const book = openBook(params.book);
	if (params.page) {
		book.active = new Number(params.page).valueOf();
		closeBook(book);
	}

	return { book };
}
