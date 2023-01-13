<script>
	import NoteItem from './NoteItem.svelte';
	import { Search, Filter, Plus } from './icons';

	import {
		note as noteStore,
		notes,
		showNavigation,
		showNotes,
		showEditor,
		noteTags,
		user,
		updateNote,
		noteFilter,
		filteredNotes
	} from '$lib/stores';
	import { supabaseClient } from './db';
	import { tick } from 'svelte';
	import { saveNote } from './utils';

	async function addNote() {
		const res = await fetch('/api/note', {
			method: 'POST',
			body: JSON.stringify({ index: $notes.length + 1 }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			const data = await res.json();

			// clear and update stores with new note
			$noteTags = [];
			$noteStore = data;
			$notes.unshift(data); // faster than concat
			$notes = $notes; // trigger rerender

			// focus note
			$showNavigation = false;
			$showNotes = false;
			$showEditor = true;
		}
	}

	function openSidebar() {}

	// TODO: move this into the note store component?
	// TODO: before you change notes in the sidebar the note should also be saved
	// async function saveNote() {
	// 	console.log('saving...');
	// 	console.log($noteStore.content);
	// 	const res = await fetch('/api/note', {
	// 		method: 'PATCH',
	// 		body: JSON.stringify({
	// 			note_id: $noteStore.id,
	// 			title: $noteStore.title,
	// 			content: $noteStore.content
	// 		}),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});

	// 	if (res.ok) {
	// 		console.log('saving ok');
	// 		return;
	// 	}
	// }
</script>

<!-- <div class="content flex flex-col hidden md:flex "> -->
<div class="items h-full flex flex-col bg-slate-50 relative">
	<div class="items__head flex flex-col px-4 py-2 border-b shadow-sm bg-slate-50">
		<div class="flex justify-between items-center mb-2">
			<div class="flex flex-row gap-4">
				<button
					class="md:hidden"
					aria-label="Open menu"
					on:click={() => {
						openSidebar();
						$showNavigation = true;
						$showNotes = false;
						$showEditor = false;
					}}
				>
					<!-- Burger icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="6" x2="21" y2="6" />
						<line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>
				<h3 class="text-xl font-semibold">Notes</h3>
			</div>

			<div>
				<button aria-label="Filter notes">
					<Filter size={24} />
				</button>

				<button aria-label="Create a new note" on:click={addNote}>
					<Plus size={24} />
				</button>
			</div>
		</div>

		<div class="flex border rounded-full bg-white px-2 py-1">
			<label for="search" class="mr-2">
				<Search />
			</label>
			<input
				id="search"
				type="text"
				placeholder="search"
				class="outline-none"
				bind:value={$noteFilter}
			/>
		</div>
	</div>

	<div class="items__list flex h-full max-h-full relative">
		<!-- if user has no notes -->

		<!-- if no match found -->
		{#if $filteredNotes.length > 0}
			<ul class="flex flex-col h-full w-full">
				{#each $filteredNotes as note (note.id)}
					<li
						class="border-l-2 border-solid"
						class:border-indigo-700={$noteStore.id === note.id}
						class:border-transparent={$noteStore.id !== note.id}
					>
						<button
							class="w-full p-4 border-b border-solid"
							on:click={async () => {
								// save current note

								saveNote(); // await?

								// update note store
								$noteStore = note;

								$updateNote = Math.random();
								$showEditor = true;
								$showNavigation = false;
								$showNotes = false;

								// this query is still a bit bad since I bascially only want an array
								// of strings that are the tags related to a note
								const { data, error } = await supabaseClient
									.from('note_tags')
									.select('note_id!inner(id), id, tag_id (tag, id)')
									.eq('note_id.id', note.id);

								if (error) {
									console.error(error);
								}

								$noteTags = data.map((dataTag) => {
									return { name: dataTag.tag_id.tag, id: dataTag.id };
								});

								// console.log(data);
							}}
						>
							<NoteItem note={$noteStore.id === note.id ? $noteStore : note} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<!-- button to create note (0 state) -->
			<div class="w-full h-full flex justify-center items-center">
				<p>no notes</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.items {
		// &__head {}

		&__list {
			overflow: hidden;

			ul {
				overflow-y: auto;
			}
		}
	}

	@media (min-width: 768px) {
		//
	}
</style>
