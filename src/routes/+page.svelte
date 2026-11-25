<script lang="ts">
	let { data, form } = $props();
</script>

<div class="flex h-screen flex-col justify-around text-center">
	<h1 class="text-5xl">Welcome to gamebook helper!</h1>

	<div>
		{#if form?.error}
			<p class="text-red-600 m-6">{form.error}</p>
		{/if}

		<form class="flex items-center justify-center gap-10" method="POST">
			<label>
				<span class="me-2">New book:</span>
				<input class="border p-1" name="name" required />
			</label>
			<button
				class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
				>START</button
			>
		</form>
	</div>
	{#if data.books.length > 0}
		<div>
			<h2 class="text-3xl my-7 underline">Previous adventures</h2>
			<div class="grid grid-cols-3 gap-5">
				{#each data.books as book}
					<a href="/{book}">{book}</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
