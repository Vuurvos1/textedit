<script>
	import NoteItem from './NoteItem.svelte';
	import { supabase, user } from './supabase';
	import {
		note as noteStore,
		notes,
		showNavigation,
		showNotes,
		showEditor,
		noteTags
	} from '$lib/stores';
	import { onMount } from 'svelte';
	import { Search, Filter, Plus } from './icons';

	async function addNote() {
		const { data, error } = await supabase.from('notes').insert({
			user_id: $user?.id,
			title: `Note ${$notes.length + 1}`
		});

		if (!error) {
			$noteStore = data[0];
			$notes.unshift(data[0]); // faster than concat
			$notes = $notes; // trigger rerender
		} else {
			console.error(error);
		}
	}

	async function getNotes() {
		// fetch users notes
		// TODO: change this to the last updated field (how to handle pins?)
		const { data, error } = await supabase
			.from('notes')
			.select()
			.order('updated_at', { ascending: false });
		notes.set(data);

		if (!error) {
			if (data.length > 0) {
				$noteStore = data[0];
			}
		} else {
			console.error(error);
		}
	}

	function openSidebar() {}

	onMount(async () => {
		// server fetch these
		getNotes();
	});
</script>

<!-- <div class="content flex flex-col hidden md:flex "> -->
<div class="items h-full flex flex-col bg-slate-50 relative">
	<div class="items__head flex flex-col px-4 py-2">
		<div class="flex justify-between items-center">
			<h3 class="text-xl font-semibold">Notes</h3>

			<div>
				<button title="Filter notes">
					<Filter size={24} />
				</button>

				<button title="Create a new note" on:click={addNote}>
					<Plus size={24} />
				</button>
			</div>
		</div>

		<button
			class="burger"
			on:click={() => {
				openSidebar();
				$showNavigation = true;
				$showNotes = false;
				$showEditor = false;
			}}>Burger</button
		>

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

								// .eq('', note.id)

								const { data, error } = await supabase
									.from('note_tags')
									.select('note_id!inner(id), tag_id (tag)')
									.eq('note_id.id', note.id);

								$noteTags = data;

								console.log(data);
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
				.burger {
					display: none;
				}
			}
		}
	}
</style>
