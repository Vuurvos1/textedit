<script>
	import NoteItem from './NoteItem.svelte';
	import { supabase, user } from './supabase';
	import { note as noteStore, notes, showNavigation, showNotes, showEditor } from '$lib/stores';
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
		}

		console.log(data, error);
	}

	async function getNotes() {
		// fetch users notes
		// TODO: change this to the last updated field (how to handle pins?)
		const { data, error } = await supabase
			.from('notes')
			.select()
			.order('updated_at', { ascending: false });
		notes.set(data);
		if (data?.length > 0) {
			$noteStore = data[0];
		}
	}

	function openSidebar() {}

	onMount(async () => {
		// server fetch these
		getNotes();
	});
</script>

<!-- class="h-full bg-slate-50 flex flex-col relative" -->
<!-- <div class="content flex flex-col hidden md:flex "> -->
<div class="h-full items-column">
	<div class="items-head flex flex-col">
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
		<!-- <button on:click={getNotes}>Get notes</button> -->

		<button
			class="list-burger"
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

	<div class="flex-content flex note-list">
		{#if $notes.length > 1}
			<ul class="h-full flex flex-col scrollable-content-wrapper ">
				{#each $notes as note}
					<li
						class="border-l-2 border-solid"
						class:border-indigo-700={$noteStore.id === note.id}
						class:border-transparent={$noteStore.id !== note.id}
					>
						<button
							class="w-full p-4 border-b border-solid"
							on:click={() => {
								$noteStore = note;
								$showEditor = true;
								$showNavigation = false;
								$showNotes = false;
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
	.items-column {
		position: relative;
		height: 100%;
		max-height: 100%;

		display: flex;
		flex-direction: column;
	}

	.note-list {
		overflow-y: hidden;
	}

	.flex-content {
		position: relative;
		display: flex;
		overflow: hidden;
		height: 100%;
		max-height: 100%;
	}

	.scrollable-content-wrapper {
		height: 100%;

		overflow-y: scroll;
	}

	ul {
		// max-height: 100%;
		// height: 100%;
		// max-height: 20rem;
		// overflow-y: hidden;
		// overflow-y: auto;
		// height: 100%;
	}

	// .list-burger {}

	.items-head {
		// height: auto;
		// fixed on mobile
		// padding on child top
	}

	@media (min-width: 768px) {
		// place items head back
		// remove padding top

		.list-burger {
			display: none;
		}
	}
</style>
