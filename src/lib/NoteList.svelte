<script>
	import NoteItem from './NoteItem.svelte';
	import { supabase, user } from './supabase';
	import { note as noteStore, notes, showNavigation, showNotes, showEditor } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Search } from './icons';

	async function addNote() {
		const { data, error } = await supabase.from('notes').insert({
			user_id: $user?.id,
			title: 'Note'
		});

		console.log(data, error);
	}

	async function getNotes() {
		// fetch users notes
		const { data, error } = await supabase.from('notes').select();
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

<div class="min-h-[85vh] h-full bg-slate-50">
	<div class="items-head">
		<div class="flex justify-between">
			<h3>Notes</h3>
			<button on:click={addNote}>Add note</button>
		</div>
		<!-- <button on:click={getNotes}>Get notes</button> -->

		<button
			on:click={() => {
				openSidebar();
				$showNavigation = true;
				$showNotes = false;
				$showEditor = false;
			}}>Burger</button
		>

		<div class="flex border rounded-full">
			<label for="search">
				<Search />
			</label>

			<input id="search" type="text" placeholder="search" class="outline-none" />
		</div>
	</div>

	<div>
		{#if $notes.length > 1}
			<ul>
				{#each $notes as note}
					<li class:bg-indigo-700={$noteStore.id === note.id}>
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
	.items-head {
		// fixed on mobile
		// padding on child top
	}

	@media (min-width: 768px) {
		// place items head back
		// remove padding top
	}
</style>
