<script>
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	import { showNavigation, showNotes, showEditor } from '$lib/stores';

	/** @type {import('./$types').PageData} */
	export let data;
	let { tags } = data;
	$: ({ tags } = data); // so it stays in sync when `data` changes
</script>

<div class="layout">
	<div class:selected={$showNavigation} class="navigation bg-slate-300">
		<Sidebar {tags} />
	</div>
	<div class:selected={$showNotes} class="items">
		<NoteList />
	</div>
	<div class:selected={$showEditor} class="editor">
		<!-- TODO if note is selected or select default note -->
		<Note />
	</div>
</div>

<Footer />

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
	}

	// < tablet
	@media (max-width: 768px) {
		.navigation,
		.items,
		.editor {
			min-height: 100vh;

			&:not(.selected) {
				visibility: hidden;
				height: 0;
				min-height: 0;
			}
		}
	}

	// tablet
	@media (min-width: 768px) {
		.layout {
			display: grid;
			grid-template-columns: auto auto 1fr;
			height: calc(100vh - 2rem);
		}
	}
</style>
