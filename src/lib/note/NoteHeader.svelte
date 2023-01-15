<script lang="ts">
	import type EasyMDE from 'easymde';

	import { Save, Download, Trash, Inbox, Chevron } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';
	import TagChip from '$lib/ui/TagChip.svelte';

	import { createPopperActions } from 'svelte-popperjs';
	import { clickOutside } from '$lib/clickOutside';

	import {
		filteredNotes,
		note,
		notes,
		noteTags,
		showEditor,
		showNavigation,
		showNotes,
		tags
	} from '$lib/stores';

	import type { NoteStatus } from './note';

	export let easymde: EasyMDE;

	// TODO: add some id thing so that only 1 can be open at a time,
	// like a global store thing
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
		// console.log($note);

		const blob = new Blob([$note.content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = `${$note.title}.md`;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url); // Remove Object URL after use
	}

	let searchString = '';
	let searchResults = [];
	let searchIndex = -1;
	async function searchTags(ev) {
		if (searchString == '') {
			searchResults = [];
			return;
		}

		//  cancel search
		if (ev.key === 'Escape') {
			//reset values
			searchString = '';
			searchResults = [];
			searchIndex = -1;
			return;
		}

		searchResults = $tags.filter((item) => item.tag.includes(searchString));

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

	async function addTagToNote(index) {
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
			console.error('Problem deleting note');
			return;
		}

		const data = await res.json();
		$noteTags.push({ id: data.id, name: searchResults[index].tag });
		$noteTags = $noteTags;

		// reset values
		searchString = '';
		searchResults = [];
		searchIndex = -1;
	}
</script>

<div class="flex flex-row gap-2 justify-between items-center flex-wrap px-4 py-2">
	<div class="flex flex-row items-center mb-2 w-full">
		<button
			aria-label="Back"
			class="back-button mr-2"
			on:click={() => {
				$showNotes = true;
				$showEditor = false;
				$showNavigation = false;
			}}
		>
			<Chevron rotation={270} />
		</button>

		{#if $note?.title}
			<input
				id="title"
				aria-label="title"
				type="text"
				bind:value={$note.title}
				class="w-full text-2xl font-bold bg-transparent focus:outline-none"
			/>
		{/if}

		<div class="ml-auto">
			<PopoutMenu>
				<div class="flex flex-col py-2">
					<!-- TODO: create icon button component -->
					<!-- <button
								class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400"
								title="Save note"
								on:click={saveNote}
							>
								<Save />
								<span>(Force) save</span>
							</button> -->

					<button
						class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-200"
						on:click={downloadNote}
					>
						<Download size={16} />
						<span>Export</span>
					</button>
					<button
						class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-200 text-yellow-400"
						on:click={() => {
							if ($note.status == 'archived') {
								updateNoteStatus('notes'); // rename to 'active'?
								return;
							}
							updateNoteStatus('archived');
						}}
					>
						<Inbox size={16} />
						<span>{$note.status === 'archived' ? 'Unarchive' : 'Archive'}</span>
					</button>
					<button
						class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-200 text-red-600"
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
			{#each $noteTags as tag}
				<li>
					<TagChip {tag} />
				</li>
			{/each}
		</ul>

		<!-- search tags -->
		<input
			id="title"
			type="text"
			placeholder="add tag"
			class="bg-transparent border-b-2 border-transparent focus:outline-none focus:border-blue-400 "
			use:popperRef
			bind:value={searchString}
			on:keyup={searchTags}
		/>

		{#if searchResults.length > 0}
			<ul
				class="z-10 bg-white rounded shadow"
				use:popperContent={extraOpts}
				use:clickOutside
				on:outclick={() => {
					searchResults = [];
					searchString = '';
				}}
			>
				{#each searchResults as option, i}
					<li class="hover:bg-slate-100 " class:bg-slate-200={searchIndex === i}>
						<button
							class="px-4 py-1"
							on:click={async () => {
								// add tag to post
								addTagToNote(i);
							}}
						>
							<!-- bolds part of string that matches search -->
							{@html option.tag.replace(searchString, `<b>${searchString}</b>`)}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style></style>
