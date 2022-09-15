<script>
	// import { onMount } from 'svelte/types/runtime/internal/lifecycle';
	import NoteItem from './NoteItem.svelte';
	import { supabase, user } from './supabase';
	import { note as noteStore, notes } from '$lib/stores';

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
	}
</script>

<div class="min-h-[85vh]">
	<div>
		<h3>Notes</h3>
		<button on:click={addNote}>Add note</button>
		<button on:click={getNotes}>Get notes</button>
		<label for="search">search</label>
		<input id="search" type="text" />
	</div>

	<div>
		{#if $notes.length > 1}
			<ul>
				{#each $notes as note}
					<li>
						<button
							on:click={() => {
								$noteStore = note;
								console.log($noteStore);
							}}
						>
							<NoteItem {note} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p>no notes</p>
		{/if}
	</div>
</div>

<style lang="scss">
</style>
