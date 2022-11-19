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
		user
	} from '$lib/stores';
	import { supabaseClient } from './db';

	async function addNote() {
		if (!$user) return;

		const { data, error } = await supabaseClient
			.from('notes')
			.insert({
				user_id: $user.id,
				title: `Note ${$notes.length + 1}`
			})
			.select();

		if (!error) {
			$noteStore = data[0];
			$notes.unshift(data[0]); // faster than concat
			$notes = $notes; // trigger rerender

			// focus note
			$showNavigation = false;
			$showNotes = false;
			$showEditor = true;
		} else {
			console.error(error);
		}
	}

	function openSidebar() {}
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
			<input id="search" type="text" placeholder="search" class="outline-none" />
		</div>
	</div>

	<div class="items__list flex h-full max-h-full relative">
		{#if $notes.length > 1}
			<ul class="flex flex-col h-full w-full">
				{#each $notes as note}
					<li
						class="border-l-2 border-solid"
						class:border-indigo-700={$noteStore.id === note.id}
						class:border-transparent={$noteStore.id !== note.id}
					>
						<button
							class="w-full p-4 border-b border-solid"
							on:click={async () => {
								$noteStore = note;
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
							<NoteItem {note} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<!-- button to create note (0 state) -->
			<p>no notes</p>
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
		// place items head back

		.items {
			&__head {
			}
		}
	}
</style>
