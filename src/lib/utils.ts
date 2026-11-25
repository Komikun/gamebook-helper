import type { Book, Page } from '#lib/types.d.ts';
import fs from 'node:fs';

export function emptyBook(): Book {
	return {
		active: undefined,
		name: '',
		pages: [],
		text: ''
	};
}

export function parsePage(data: FormData): Page {
	const links = data
		.getAll('link[]')
		.filter((value) => value.valueOf() !== '')
		.map((value) => Number(value.valueOf()));

	return {
		id: new Number(data.get('id')).valueOf(),
		extra: new String(data.get('extra') ?? '').valueOf(),
		links
	};
}

export function openBook(name: string): Book {
	return JSON.parse(fs.readFileSync('static/' + name + '.book', 'utf-8'));
}

export function closeBook(book: Book): void {
	fs.writeFileSync('static/' + book.name + '.book', JSON.stringify(book));
}