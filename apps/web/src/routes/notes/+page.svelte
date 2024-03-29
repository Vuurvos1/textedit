<script lang="ts">
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	import {
		tagFolders,
		notes as notesStore,
		note,
		tags as tagsStore,
		filteredNotes,
		noteDirty,
		showWindow
	} from '$lib/stores';
	import { insertTag } from '$lib/tags/tagUtils';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	// TODO: how to sort these, preferibly the user can determine the order
	let { tags, notes } = data;
	$: ({ tags, notes } = data);

	$tagsStore = tags;

	// change to an object for speed?
	$tagFolders = tags
		.map((path) => path.name.split('/').filter((tag: string | undefined) => tag))
		.reduce((children, path) => insertTag(children, path), []);

	$notesStore = notes;
	$note = $filteredNotes[0];

	function unload(ev: BeforeUnloadEvent) {
		// only show if note is dirty
		if ($noteDirty) {
			ev.preventDefault();
			ev.returnValue = '';
		}
	}

	onMount(() => {
		// show warning on tab close
		window.addEventListener('beforeunload', unload);

		return () => {
			window.removeEventListener('beforeunload', unload);
		};
	});
</script>

<div class="app h-screen min-h-screen">
	<div class="layout h-full">
		<div
			class:selected={$showWindow === 'navigation'}
			class="navigation overflow-y-auto bg-slate-300"
		>
			<Sidebar />
		</div>
		<div class:selected={$showWindow === 'notes'} class="items h-full">
			<NoteList />
		</div>
		<div class:selected={$showWindow === 'editor'} class="editor overflow-hidden">
			<Note />
		</div>
	</div>

	<Footer />
</div>

<style lang="postcss">
	.app {
		position: relative;
	}

	.layout {
		display: flex;
		flex-direction: column;
	}

	/* < tablet */
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

	/* tablet > */
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
