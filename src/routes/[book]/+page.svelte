<script lang="ts">
	let { data } = $props();
</script>

<main class="text-center">
	<h1 class="my-5 text-5xl">{data.book.name}</h1>
	{#if data.book.active === undefined}
		<form method="POST" action="?/goto">
			<label>
				<span>Id:</span>
				<input class="border p-1" name="id" type="number" required />
			</label>
			<button
				class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
				>Take first step</button
			>
		</form>
	{:else}
		<p>
			You have stopped at page <a
				class=" font-bold text-red-500 hover:text-red-600"
				href={'./' + data.book.name + '/' + data.book.active}>{data.book.active}</a
			>.
		</p>
	{/if}
</main>
