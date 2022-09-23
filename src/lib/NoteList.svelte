<script>
	import NoteItem from './NoteItem.svelte';
	import { supabase, user } from './supabase';
	import { note as noteStore, notes } from '$lib/stores';
	import { onMount } from 'svelte';

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

	onMount(async () => {
		// server fetch these
		getNotes();
	});
</script>

<div class="min-h-[85vh] h-full">
	<div>
		<div class="flex justify-between">
			<h3>Notes</h3>
			<button on:click={addNote}>Add note</button>
		</div>
		<!-- <button on:click={getNotes}>Get notes</button> -->

		<div class="flex border rounded-full">
			<label for="search">
				<!-- search -->
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
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
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
</style>
