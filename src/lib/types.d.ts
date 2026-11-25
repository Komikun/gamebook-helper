export type Book = {
    name: string;
    text: string;
    pages: Page[];
    active?: number;
}

export type Page = {
    id: number;
    extra: string;
    links: number[];
}