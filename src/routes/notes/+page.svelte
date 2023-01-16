<script lang="ts">
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	import {
		showNavigation,
		showNotes,
		showEditor,
		tagFolders,
		notes as notesStore,
		note,
		tags as tagsStore,
		filteredNotes
	} from '$lib/stores';
	import { insertTag } from '$lib/tags/tagUtils';
	import type { PageData } from './$types';

	export let data: PageData;

	// TODO: how to sort these, preferibly the user can determine the order
	let { tags, notes } = data;
	$: ({ tags, notes } = data);

	$tagsStore = tags;

	// console.log(notes, tags);

	// change to an object for speed?
	$tagFolders = tags
		.map((path) => path.tag.split('/').filter((tag) => tag))
		.reduce((children, path) => insertTag(children, path), []);

	$notesStore = notes;
	$note = $filteredNotes[0];
</script>

<div class="app h-screen min-h-screen">
	<div class="layout h-full">
		<div class:selected={$showNavigation} class="navigation bg-slate-300">
			<Sidebar />
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
