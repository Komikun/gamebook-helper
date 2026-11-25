# Gamebook helper

This tool, written with [Svelte](https://svelte.dev/), helps you with your gamebook playthroughs.

### How do I run this?

- first you clone the repo
- install dependencies with `npm install`
- run the dev server with `npm run dev`
- navigate to your `http://localhost:5173/` or whatever link vite tells you to

### How it works

- every gamebook you start is saved as `<name>.book` file with all its data
- for each page you visit you specify the links where you can go and any extras you want (monsters, traps, etc.. )
- on the right panel you can track notes that persists between pages (like your stats, collected treasure or clues that you have found)
- on the left panel, you can find list of unvisited pages, list of pages with extras and most importantly graph represented as edge list, that can be used with tool like [graphonline](https://graphonline.top/create_graph_by_edge_list)
