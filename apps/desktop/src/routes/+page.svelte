<script lang="ts">
	import CommandPallete from '$lib/CommandPallete.svelte';
	import Editor from '$lib/Editor.svelte';
	import Ribbon from '$lib/Ribbon.svelte';
	import SearchNoteModal from '$lib/SearchNoteModal.svelte';
	import SettingsModal from '$lib/SettingsModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import TitleBar from '$lib/TitleBar.svelte';
	import WordCounter from '$lib/WordCounter.svelte';

	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
</script>

<!-- For some reason you can't do this -->
<!-- <svelte:body class:theme-dark={$theme === 'dark'} class:theme-light={$theme === 'light'} /> -->

<div class="app flex h-full max-h-full flex-col overflow-hidden">
	<TitleBar />

	<div class="bg-bg-secondary flex h-full max-h-full flex-row overflow-auto">
		<!-- Ribbon -->
		<!-- Sidebar/Tabs -->
		<!-- Editor -->

		<Ribbon />

		<PaneGroup direction="horizontal" class="flex h-full w-full ">
			<Pane defaultSize={20} class="flex flex-col">
				<Sidebar />
			</Pane>

			<!-- bg-background -->
			<!-- bg-muted -->
			<!-- bg-border -->

			<!-- after:bg-pink-400/10 -->
			<PaneResizer
				class="bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
			></PaneResizer>
			<Pane defaultSize={50} class="">
				<main class="bg-bg-primary flex h-full w-full flex-col">
					<div class="relative flex h-full w-full overflow-hidden">
						<Editor />

						<div class="absolute bottom-0 right-0">
							<WordCounter></WordCounter>
						</div>
					</div>
				</main>
			</Pane>
		</PaneGroup>
	</div>

	<!-- TODO make it so only 1 modal can be open at a time? -->
	<SearchNoteModal />
	<CommandPallete />
	<SettingsModal />
</div>
