<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import { note } from '$lib/stores';
</script>

<div class="flex h-full flex-row">
	<Sidebar></Sidebar>

	<main class="flex h-full w-full flex-col">
		<div class="h-full overflow-hidden">
			<textarea
				bind:value={$note}
				class="h-full w-full resize-none border-none p-3 focus:outline-none"
			></textarea>
		</div>
	</main>
</div>

<style lang="postcss">
	/* TODO: move elsewhere? */
	:global(body) {
		/* Prevent the user from selecting text in the example */
		user-select: none;
	}
</style>
