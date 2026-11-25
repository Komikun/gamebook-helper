<script lang="ts">
	let { data, params } = $props();
</script>

<aside class="text-center">
	<h2 class="text-2xl">Notes</h2>
	<form method="POST" action="/{params.book}{params.page ? '/' + params.page : ''}?/updateText">
		<textarea class="m-2 block w-xs border p-1" style="height: 80vh" name="text"
			>{data.book.text}</textarea
		>
		<button
			class="cursor-pointer rounded-md bg-orange-600 px-5 py-2 font-medium text-white hover:bg-orange-700"
			>Update</button
		>
	</form>
</aside>
