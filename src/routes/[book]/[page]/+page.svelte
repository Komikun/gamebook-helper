<script lang="ts">
	import type { Page } from '#lib/types.js';

	let { data, params } = $props();
	let currentPageNumber = $derived(new Number(params.page).valueOf());
	let activePage: Page = $derived(
		data.book.pages.find((n) => n.id == currentPageNumber) ?? {
			id: currentPageNumber,
			extra: '',
			links: []
		}
	);
	let edit = $derived(data.book.pages.find((n) => n.id == currentPageNumber) === undefined);

	function removePath(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		event.preventDefault();
		if (!activePage) return;
		const input = event.currentTarget.previousElementSibling as HTMLInputElement;
		const value = input.valueAsNumber;
		const set = new Set(activePage.links);
		set.delete(value);
		activePage = { ...activePage, links: Array.from(set) };
	}

	function addPath(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		event.preventDefault();
		if (!activePage) return;
		const input = event.currentTarget.previousElementSibling as HTMLInputElement;
		const value = input.valueAsNumber;
		if (isNaN(value)) return;
		const set = new Set(activePage.links);
		set.add(value);
		activePage = { ...activePage, links: Array.from(set) };
		input.value = '';
	}
</script>

<div class="text-center">
	<h1 class="my-5 text-5xl">{data.book.name}</h1>
	<h2 class="mb-5">You are at: <span class="text-2xl">{activePage.id}</span></h2>
	<form method="POST" action="?/edit">
		<input type="hidden" name="id" value={activePage.id} />
		<div class="flex justify-center text-left">
			<span class="me-2 mt-1">Paths:</span>
			<div class="">
				{#each activePage.links as link}
					<div class="">
						<input type="number" name="link[]" class="border p-1" value={link} readonly />
						{#if edit}
							<button
								type="button"
								class="ml-11 cursor-pointer bg-orange-600 px-1 py-0 font-medium text-white hover:bg-orange-700"
								onclick={removePath}>X</button
							>
						{:else}
							<a
								href={'./' + link}
								class="ml-11 cursor-pointer rounded-md bg-orange-600 px-2 py-1 font-medium text-white hover:bg-orange-700"
								>Go!</a
							>
						{/if}
					</div>
				{/each}
				{#if edit}
					<div>
						<input type="number" name="link[]" class="border p-1" />
						<button
							class="cursor-pointer rounded-md bg-orange-600 px-5 py-1 font-medium text-white hover:bg-orange-700"
							onclick={addPath}>Add path</button
						>
					</div>
				{/if}
			</div>
		</div>
		<div class="my-10 flex justify-center text-left">
			<span class="me-2 mt-1">Extra:</span>
			<textarea name="extra" class="h-40 w-2xs border p-2" readonly={!edit}
				>{activePage.extra}</textarea
			>
		</div>
		{#if edit}
			<button
				class="cursor-pointer rounded-md bg-orange-600 px-5 py-1 font-medium text-white hover:bg-orange-700"
				>Save changes</button
			>
		{:else}
			<button
				class="cursor-pointer rounded-md bg-orange-600 px-5 py-1 font-medium text-white hover:bg-orange-700"
				onclick={(event) => {
					event.preventDefault();
					edit = true;
				}}>Edit page</button
			>
		{/if}
	</form>
</div>
