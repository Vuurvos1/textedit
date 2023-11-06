<script lang="ts">
	import type { Tag } from '$lib/sidebar/tags';
	import type { NoteStatus } from './note';

	import { Download, Trash, Inbox, Chevron } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';
	import TagChip from '$lib/ui/TagChip.svelte';

	import { createPopperActions } from 'svelte-popperjs';
	import { clickOutside } from '$lib/clickOutside';

	import { filteredNotes, note, notes, showWindow, tags } from '$lib/stores';

	// TODO: add some id thing so that only 1 can be open at a time, like a global store thing
	const [popperRef, popperContent] = createPopperActions({
		placement: 'bottom-start'
	});
	export const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 0] } }]
	};

	async function updateNoteStatus(newStatus: NoteStatus) {
		// TODO: add RLS to validate status
		const res = await fetch('/api/note', {
			method: 'PATCH',
			body: JSON.stringify({ note_id: $note.id, status: newStatus }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (!res.ok) {
			console.error('Problem updating note status');
			return;
		}

		const noteIndex = $notes.findIndex((n) => n.id === $note.id);
		$notes[noteIndex].status = newStatus;
		$note = $filteredNotes[0];
	}

	async function deleteNote() {
		// TODO: move to trash folder first (remove note after 30 days in folder?)
		const res = await fetch('/api/note', {
			method: 'DELETE',
			body: JSON.stringify({ note_id: $note.id }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (!res.ok) {
			console.error('Problem deleting note');
			return;
		}

		$notes = $notes.filter((item) => item.id !== $note.id);
		$note = $filteredNotes[0];
	}

	async function downloadNote() {
		// TODO: add metadata header on top > add tags to $note
		const blob = new Blob([$note.content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = `${$note.title}.md`;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url); // Remove Object URL after use
	}

	let searchString = '';
	let searchResults: Tag[] = [];
	let searchIndex = -1;
	async function searchTags(ev: KeyboardEvent) {
		if (searchString == '') {
			searchResults = [];
			return;
		}

		//  cancel search
		if (ev.key === 'Escape') {
			resetSearch();
			return;
		}

		searchResults = $tags.filter((item) => item.name.includes(searchString));

		if (ev.key === 'ArrowUp') {
			searchIndex--;
			if (searchIndex < 0) {
				searchIndex = searchResults.length - 1;
			}
			return;
		}

		if (ev.key === 'ArrowDown') {
			// focus first search result
			searchIndex++;
			if (searchIndex > searchResults.length - 1) {
				searchIndex = 0;
			}
			return;
		}

		// TODO: create a dropdown/context menu for this
		if (ev.key === 'Enter' && searchResults.length > 0) {
			addTagToNote(searchIndex);
		}
	}

	async function addTagToNote(index: number) {
		const tagName = searchResults[index].tag;

		if ($note.tags.some((tag) => tag.name === tagName)) {
			console.info('Tag already exists');
			return;
		}

		const res = await fetch('/api/noteTag', {
			method: 'POST',
			body: JSON.stringify({
				note_id: $note?.id,
				tag_id: searchResults[index].id
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (!res.ok) {
			console.error('Problem adding tag to note');
			return;
		}

		const data = await res.json();

		$note.tags.push({ id: data.id, name: searchResults[index].name });
		$note = $note;

		// TODO: still update the note tags after the post to ensure the note is up to date

		resetSearch();
	}

	function resetSearch() {
		searchString = '';
		searchResults = [];
		searchIndex = -1;
	}
</script>

<div class="flex flex-row flex-wrap items-center justify-between gap-2 px-4 py-2">
	<div class="mb-2 flex w-full flex-row items-center">
		<button
			aria-label="Back"
			class="back-button mr-2 md:hidden"
			on:click={() => {
				$showWindow = 'notes';
			}}
		>
			<Chevron rotation={270} />
		</button>

		{#if $note}
			<input
				id="title"
				aria-label="title"
				type="text"
				bind:value={$note.title}
				class="w-full bg-transparent text-2xl font-bold focus:outline-none"
			/>
		{/if}

		<div class="ml-auto">
			<PopoutMenu>
				<div class="flex flex-col py-2">
					<!-- TODO: create icon button component -->
					<!-- TODO: create save state indicator -->
					<button
						class="flex w-full flex-row items-center gap-2 px-4 py-1 hover:bg-slate-200"
						on:click={downloadNote}
					>
						<Download size={16} />
						<span>Export</span>
					</button>
					<button
						class="flex w-full flex-row items-center gap-2 px-4 py-1 text-yellow-400 hover:bg-slate-200"
						on:click={() => {
							if ($note.status == 'archived') {
								updateNoteStatus('public'); // rename to 'active'?
								return;
							}
							updateNoteStatus('archived');
						}}
					>
						<Inbox size={16} />
						<span>{$note.status === 'archived' ? 'Unarchive' : 'Archive'}</span>
					</button>
					<button
						class="flex w-full flex-row items-center gap-2 px-4 py-1 text-red-600 hover:bg-slate-200"
						on:click={deleteNote}
					>
						<Trash size={16} />
						<span>Delete</span>
					</button>

					<!-- Duplicate -->
					<!-- Spellcheck -->
				</div>
			</PopoutMenu>
		</div>
	</div>

	<div class="flex flex-row flex-wrap gap-2">
		<ul class="flex flex-row flex-wrap gap-2">
			{#if $note}
				{#each $note.tags as tag}
					{#if tag.name}
						<li>
							<TagChip {tag} />
						</li>
					{/if}
				{/each}
			{/if}
		</ul>

		<!-- search tags -->
		<input
			id="title"
			type="text"
			placeholder="add tag"
			class="border-b-2 border-transparent bg-transparent focus:border-blue-400 focus:outline-none"
			use:popperRef
			bind:value={searchString}
			on:keyup={searchTags}
		/>

		{#if searchResults.length > 0}
			<ul
				class="z-10 rounded bg-white shadow"
				use:popperContent={extraOpts}
				use:clickOutside
				on:outclick={(ev) => {
					searchString = '';
				}}
			>
				{#each searchResults as option, i}
					<li class="hover:bg-slate-100" class:bg-slate-200={searchIndex === i}>
						<button
							class="px-4 py-1"
							on:click={async () => {
								addTagToNote(i); // add tag to post
							}}
						>
							<!-- bolds part of string that matches search -->
							{@html option.name.replace(searchString, `<b>${searchString}</b>`)}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style></style>
