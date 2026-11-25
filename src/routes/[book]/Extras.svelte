<script lang="ts">
	import type { Book } from '#lib/types.d.ts';
	let { data }: { data: { book: Book } } = $props();
	/* Functional way, but duplicates links a>b, b>a, instead of a-b
	let graph = $derived.by(() => {
		return data.book.pages.reduce<string>((acc: string, page: Page): string => {
			return acc + page.links.reduce<string>((acc: string, link: number) => acc + `${page.id}>${link}\n`, '');
		}, '');
	});
	*/
	let graph = $derived.by(() => {
		let result = '';
		const map = new Map<number, number[]>();
		const extraSet = new Set();
		data.book.pages.forEach((page) => {
			map.set(page.id, page.links.slice());
			if (markExtras && page.extra !== '') {
				extraSet.add(page.id);
			}
		});
		map.forEach((links: number[], key: number) => {
			links.forEach((link: number) => {
				const index = map.get(link)?.findIndex((i) => i === key) ?? -1;
				const a = extraSet.has(key) ? key + 'x' : key;
				const b = extraSet.has(link) ? link + 'x' : link;
				if (index !== -1) {
					result += `${a}-${b}\n`;
					map.get(link)?.splice(index, 1);
				} else {
					result += `${a}>${b}\n`;
				}
			});
		});
		console.log(map);
		return result;
	});
	let unvisited = $derived.by(() => {
		const allIds = data.book.pages.reduce<number[]>((acc, cur) => {
			return acc.concat(cur.links);
		}, []);
		const ids = new Set(allIds);
		data.book.pages.forEach((page) => {
			ids.delete(page.id);
		});
		return Array.from(ids);
	});
	let section = $state('extras');
	let markExtras = $state(false);
</script>

<aside class="text-center">
	{#if section === 'graph'}
		<h2 class="text-2xl">Graph</h2>
		<p class="text-xs">
			(use with <a target="_blank" href="https://graphonline.top/create_graph_by_edge_list"
				>graphonline.top</a
			>)
		</p>
		<label class="cursor-pointer flex items-center justify-center gap-2"><span>Mark extras: </span><input class="cursor-pointer" type="checkbox" bind:checked={markExtras}></label>
		<textarea class="w-4xs m-2 block border p-1" style="height: 80vh" readonly>{graph}</textarea>
		<button
			class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
			onclick={() => {
				section = 'extras';
			}}>Show extras</button
		>
	{/if}
	{#if section === 'extras'}
		<h2 class="text-2xl">Extras</h2>
		<div class="m-2" style="height: 80vh">
			<ul>
				{#each data.book.pages.filter((p) => p.extra.length > 0) as page}
					<li class="flex place-items-center justify-between gap-2">
						<span>{page.id}</span><span class="text-xs">{page.extra}</span>
					</li>
				{/each}
			</ul>
		</div>
		<button
			class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
			onclick={() => {
				section = 'unvisited';
			}}>Show unvisited</button
		>
	{/if}
	{#if section === 'unvisited'}
		<h2 class="text-2xl">Unvisited</h2>
		<div class="m-2" style="height: 80vh">
			<ul>
				{#each unvisited as page}
					<li>{page}</li>
				{/each}
			</ul>
		</div>
		<button
			class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
			onclick={() => {
				section = 'graph';
			}}>Show graph</button
		>
	{/if}
</aside>
