<script>
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
		if (data?.length > 0) {
			$noteStore = data[0];
		}
	}
</script>

<div class="min-h-[85vh] h-full">
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
					<li class:bg-indigo-700={$noteStore.id === note.id}>
						<button
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
			<p>no notes</p>
		{/if}
	</div>
</div>

<style lang="scss">
</style>
