<script lang="ts">
	import SearchNoteModal from '$lib/SearchNoteModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import WordCounter from '$lib/WordCounter.svelte';
	import { note } from '$lib/stores';
</script>

<div class="flex h-full flex-row">
	<Sidebar></Sidebar>

	<main class="flex h-full w-full flex-col">
		<div class="relative h-full overflow-hidden">
			<textarea
				bind:value={$note.content}
				class="h-full w-full resize-none border-none p-3 focus:outline-none"
			></textarea>

			<div class="absolute bottom-0 right-0">
				<WordCounter></WordCounter>
			</div>
		</div>
	</main>

	<SearchNoteModal></SearchNoteModal>
</div>
