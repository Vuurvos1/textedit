<script lang="ts">
	import CommandPallete from '$lib/CommandPallete.svelte';
	import SearchNoteModal from '$lib/SearchNoteModal.svelte';
	import SettingsModal from '$lib/SettingsModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import TitleBar from '$lib/TitleBar.svelte';
	import WordCounter from '$lib/WordCounter.svelte';
	import { note } from '$lib/stores';
	import { debounce } from '$lib/utils';
	import { SplitPane } from '@rich_harris/svelte-split-pane';
	import { onMount } from 'svelte';

	function saveNote() {
		note.save();
	}

	const dividerColor = 'var(--border-color)';
	const dividerThickness = '20px';

	let theme = 'dark';

	function setTheme(theme: 'light' | 'dark') {
		theme = theme;
		document.cookie = `theme=${theme}; path=/; max-age=31536000`; // change to tauri options
	}

	onMount(() => {
		const userPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

		if (userPrefersLight) {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	});
</script>

<div
	class="app theme-dark flex h-full flex-col"
	class:theme-light={theme === 'light'}
	class:theme-dark={theme === 'dark'}
>
	<TitleBar />

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

	<!-- TODO make it so only 1 modal can be open at a time -->
	<SearchNoteModal />
	<CommandPallete />
	<SettingsModal />
</div>

<style lang="postcss">
	.app :global([data-pane='split-pane']) {
		@apply max-w-none;
	}

	.app :global([data-pane='split-pane'] .divider:hover) {
		--sp-color: theme(colors.indigo.500);
	}
</style>
