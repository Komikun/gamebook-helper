import { openBook, closeBook, parsePage } from '#lib/utils.ts';

export const actions = {
    edit: async ({ request, params }) => {
        const data = await request.formData();
        const book = openBook(params.book);
        const page = parsePage(data);

        let pageInBook = book.pages.find((p) => p.id === page.id);
        if (!pageInBook) {
            book.pages.push(page);
            pageInBook = page;
        }
        pageInBook.extra = page.extra;
        pageInBook.links = page.links;

        closeBook(book);
    },

    updateText: async({ request, params }) => {
		const data = await request.formData();
		const book = openBook(params.book);
		
		book.text = data.get('text') as string;
		closeBook(book);
	}
};
