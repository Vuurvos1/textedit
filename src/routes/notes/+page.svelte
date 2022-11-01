<script>
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	import { showNavigation, showNotes, showEditor } from '$lib/stores';

	// TODO: get these values from database
	/** @type {import('./$types').PageData} */
	export let data;
	let { tags } = data;
	$: ({ tags } = data); // so it stays in sync when `data` changes
</script>

<div class="app">
	<div class="layout">
		<div class:selected={$showNavigation} class="navigation bg-slate-300">
			<Sidebar {tags} />
		</div>
		<div class:selected={$showNotes} class="items h-full">
			<NoteList />
		</div>
		<div class:selected={$showEditor} class="editor">
			<!-- TODO if note is selected or select default note -->
			<Note />
		</div>
	</div>

	<Footer />
</div>

<style lang="scss">
	.app {
		height: 100vh;
		min-height: 100vh;
		position: relative;
	}

	.layout {
		display: flex;
		flex-direction: column;
	}

	// < tablet
	@media (max-width: 768px) {
		.navigation,
		.items,
		.editor {
			height: 100vh;
			min-height: 100vh;
			position: relative;

			&:not(.selected) {
				visibility: hidden;
				height: 0;
				min-height: 0;
			}
		}
	}

	// tablet >
	@media (min-width: 768px) {
		.layout {
			display: grid;
			grid-template-columns: auto auto 1fr;
			grid-template-rows: auto;
			height: calc(var(--viewport-height, 100vh) - 2rem);
		}

		.navigation,
		.items,
		.editor {
			height: 100%;
			max-height: 100%;
			min-height: 0px;
			display: flex;
			position: relative;
		}
	}
</style>
