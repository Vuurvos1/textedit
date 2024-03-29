<script>
	import NoteItem from './NoteItem.svelte';
	import { Search, Filter, Plus } from './icons';

	import {
		note as noteStore,
		notes,
		updateNote,
		noteFilter,
		filteredNotes,
		noteSort,
		showWindow
	} from '$lib/stores';
	import { saveNote } from './utils';
	import PopoutMenu from './ui/PopoutMenu.svelte';
	import { page } from '$app/stores';

	$: ({ supabase } = $page.data);

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
			$noteStore.tags = [];
			$noteStore = data;
			$notes.unshift(data); // faster than concat
			$notes = $notes; // trigger rerender

			$noteFilter.status = 'public';
			$updateNote = Math.random();

			// focus note mobile
			$showWindow = 'editor';
		}
	}

	function openSidebar() {}
</script>

<div class="items relative flex h-full flex-col bg-slate-50">
	<div class="items__head flex flex-col border-b bg-slate-50 px-4 py-2 shadow-sm">
		<div class="mb-2 flex items-center justify-between">
			<div class="flex flex-row gap-4">
				<button
					class="md:hidden"
					aria-label="Open menu"
					on:click={() => {
						openSidebar();
						$showWindow = 'navigation';
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

			<div class="flex flex-row gap-2">
				<PopoutMenu placement="bottom">
					<!-- turn into icon button? -->
					<button aria-label="Filter notes" slot="icon">
						<Filter size={24} />
					</button>
					<div class="flex w-max flex-col py-4">
						<h3 class="mb-1 px-2 font-bold">Sort by</h3>
						<button
							class="flex items-center justify-between gap-2 px-2 hover:bg-slate-200"
							on:click={() => {
								$noteSort = $noteSort === 'updated_at_desc' ? 'updated_at_asc' : 'updated_at_desc';
							}}
						>
							Date modified
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									class:stroke-purple-600={$noteSort === 'updated_at_asc'}
									d="M16 3V17M16 3L13 6M16 3L19 6"
								/>
								<path
									class:stroke-purple-600={$noteSort === 'updated_at_desc'}
									d="M8 7L8 21M8 21L5 18M8 21L11 18"
								/>
							</svg>
						</button>

						<button
							class="flex items-center justify-between gap-2 px-2 hover:bg-slate-200"
							on:click={() => {
								$noteSort = $noteSort === 'created_at_desc' ? 'created_at_asc' : 'created_at_desc';
							}}
						>
							Date created
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									class:stroke-purple-600={$noteSort === 'created_at_asc'}
									d="M16 3V17M16 3L13 6M16 3L19 6"
								/>
								<path
									class:stroke-purple-600={$noteSort === 'created_at_desc'}
									d="M8 7L8 21M8 21L5 18M8 21L11 18"
								/>
							</svg>
						</button>

						<button
							class="flex items-center justify-between gap-2 px-2 hover:bg-slate-200"
							on:click={() => {
								$noteSort = $noteSort === 'title_asc' ? 'title_desc' : 'title_asc';
							}}
						>
							Title
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									class:stroke-purple-600={$noteSort === 'title_desc'}
									d="M16 3V17M16 3L13 6M16 3L19 6"
								/>
								<path
									class:stroke-purple-600={$noteSort === 'title_asc'}
									d="M8 7L8 21M8 21L5 18M8 21L11 18"
								/>
							</svg>
						</button>
					</div>
				</PopoutMenu>

				<button aria-label="Create a new note" on:click={addNote}>
					<Plus size={24} />
				</button>
			</div>
		</div>

		<div class="flex rounded-full border bg-[var(--background-primary)] px-2 py-1">
			<label for="search" class="mr-2">
				<Search />
			</label>
			<input
				id="search"
				type="text"
				placeholder="search"
				class="outline-none"
				bind:value={$noteFilter.text}
			/>
		</div>
	</div>

	<div class="items__list relative flex h-full max-h-full overflow-hidden">
		{#if $filteredNotes.length > 0}
			<ul class="flex h-full w-full flex-col overflow-y-auto">
				{#each $filteredNotes as note (note.id)}
					<li
						class="border-l-2 border-solid"
						class:border-indigo-700={$noteStore.id === note.id}
						class:border-transparent={$noteStore.id !== note.id}
					>
						<button
							class="w-full border-b border-solid p-4"
							on:click={async () => {
								// save current note before switching to new one
								saveNote();

								// update note store
								$noteStore = note;
								$updateNote = Math.random();

								$showWindow = 'editor';

								// this query is still a bit bad since I bascially only want an array
								// of strings that are the tags related to a note
								// this should be done in the intial query

								const { data, error } = await supabase
									.from('note_tags')
									.select('note_id!inner(id), id, tag_id (name, id)')
									.eq('note_id.id', note.id);

								if (error) {
									console.error(error);
								}

								$noteStore.tags = data.map((dataTag) => {
									return { name: dataTag.tag_id?.name, id: dataTag.id };
								});
							}}
						>
							<NoteItem note={$noteStore.id === note.id ? $noteStore : note} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<!-- button to create note (0 state) -->
			<div class="flex h-full w-full items-center justify-center">
				<p>no notes</p>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
</style>
