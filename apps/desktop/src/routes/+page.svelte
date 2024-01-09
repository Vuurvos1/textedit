<script lang="ts">
	import CommandPallete from '$lib/CommandPallete.svelte';
	import SearchNoteModal from '$lib/SearchNoteModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import TitleBar from '$lib/TitleBar.svelte';
	import WordCounter from '$lib/WordCounter.svelte';
	import { note } from '$lib/stores';
	import { debounce } from '$lib/utils';

	function saveNote() {
		note.save();
	}
</script>

<div class="flex h-full flex-col">
	<TitleBar />

	<div class="flex h-full flex-grow flex-row">
		<Sidebar></Sidebar>

		<main class="flex h-full w-full flex-col">
			<div class="relative h-full overflow-hidden">
				<textarea
					on:keydown={debounce(saveNote, 2500)}
					bind:value={$note.content}
					class="h-full w-full resize-none border-none p-3 focus:outline-none"
				></textarea>

				<div class="absolute bottom-0 right-0">
					<WordCounter></WordCounter>
				</div>
			</div>
		</main>

		<!-- TODO make it so only 1 modal can be open at a time -->
		<SearchNoteModal></SearchNoteModal>
		<CommandPallete></CommandPallete>
	</div>
</div>
