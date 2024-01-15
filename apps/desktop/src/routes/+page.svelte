<script lang="ts">
	import CommandPallete from '$lib/CommandPallete.svelte';
	import SearchNoteModal from '$lib/SearchNoteModal.svelte';
	import SettingsModal from '$lib/SettingsModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import TitleBar from '$lib/TitleBar.svelte';
	import WordCounter from '$lib/WordCounter.svelte';
	import { note, theme } from '$lib/stores';
	import { debounce } from '$lib/utils';
	import { SplitPane } from '@rich_harris/svelte-split-pane';

	function saveNote() {
		note.save();
	}

	const dividerColor = 'var(--border-color)';
	const dividerThickness = '20px';

	console.log($theme);
</script>

<!-- For some reason you can't do this -->
<!-- <svelte:body class:theme-dark={$theme === 'dark'} class:theme-light={$theme === 'light'} /> -->

<div class="app flex h-full max-h-full flex-col overflow-hidden">
	<TitleBar />

	<div class="h-full max-h-full overflow-auto">
		<!-- TODO: maybe do own implementation since this one can feel a bit laggy -->
		<SplitPane
			type="horizontal"
			min="240px"
			max="-240px"
			pos="10%"
			priority="min"
			--thickness={dividerThickness}
			--color={dividerColor}
			id="split-pane"
		>
			<Sidebar slot="a" />

			<main slot="b" class="flex h-full w-full flex-col bg-[var(--background-primary)]">
				<div class="relative h-full w-full overflow-hidden">
					<textarea
						on:keydown={debounce(saveNote, 2500)}
						bind:value={$note.content}
						class="h-full w-full resize-none border-none bg-transparent p-3 focus:outline-none"
					></textarea>

					<div class="absolute bottom-0 right-0">
						<WordCounter></WordCounter>
					</div>
				</div>
			</main>
		</SplitPane>
	</div>

	<!-- TODO make it so only 1 modal can be open at a time? -->
	<SearchNoteModal />
	<CommandPallete />
	<SettingsModal />
</div>

<style lang="postcss">
	.app :global([data-pane='split-pane'] .divider:hover) {
		--sp-color: theme(colors.indigo.500);
	}
</style>
