<script lang="ts">
	import type { LayoutProps } from './$types';
	import Extras from './Extras.svelte';
	import Notes from './Notes.svelte';
	let { children, data, params }: LayoutProps = $props();
</script>

<div class="flex justify-between">
	<Extras {data} />
	{@render children()}
	<Notes {data} {params} />
</div>
