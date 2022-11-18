<script>
	import { Save, Download, Trash, Inbox } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';
	import TagChip from '$lib/ui/TagChip.svelte';

	import { createPopperActions } from 'svelte-popperjs';
	import { clickOutside } from '$lib/clickOutside';

	import {
		note,
		notes,
		noteTags,
		showEditor,
		showNavigation,
		showNotes,
		tags,
		user
	} from '$lib/stores';
	import { supabaseClient } from '$lib/db';

	/** @type {import('easymde')} */
	export let easymde;

	// TODO: add some id thing so that only 1 can be open at a time,
	// like a global store thing
	const [popperRef, popperContent] = createPopperActions({
		placement: 'bottom-start'
	});
	export const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 0] } }]
	};

	async function archiveNote() {
		$note.content = easymde.value();

		const { data, error } = await supabaseClient
			.from('notes')
			.update({
				user_id: $user?.id,
				status: 'archived'
			})
			.match({ id: $note.id }); // TODO add RLS rule for this

		console.log(data, error);
	}

	async function deleteNote() {
		// TODO: move this logic to "deleted page"
		// first delete all note_tags that reference this note

		const { error } = await supabaseClient.from('notes').delete().eq('id', $note.id);

		if (!error) {
			$notes = $notes.filter((item) => item.id !== $note.id);
			$note = $notes[0];
		} else {
			console.error(error);
		}

		// $note.content = easymde.value();

		// const { data, error } = await supabaseClient
		// 	.from('notes')
		// 	.update({
		// 		user_id: $user?.id,
		// 		status: 'deleted' // TODO add RLS for valid status ['active', 'archived', 'deleted']
		// 	})
		// 	.match({ id: $note.id }); // TODO add RLS rule for this
	}

	async function downloadNote() {
		// TODO add metadata on top?
		const blob = new Blob([easymde.value()], { type: 'text/plain' });
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
		// add tag to post
		const { data, error } = await supabaseClient
			.from('note_tags')
			.insert({
				user_id: $user?.id,
				tag_id: searchResults[index].id,
				note_id: $note?.id
			})
			.select();

		if (error) {
			console.error(error);
		} else {
			$noteTags.push({ id: data[0].id, name: searchResults[index].tag });
			$noteTags = $noteTags;
		}

		// reset values
		searchString = '';
		searchResults = [];
		searchIndex = -1;
	}
</script>

<div class="flex flex-row gap-4 justify-between items-center flex-wrap px-4 ">
	<!-- TODO: move this to note header component -->
	<div class="w-full">
		<div class="flex flex-row justify-between mb-2">
			<div>
				<button
					class="back-button mr-2"
					on:click={() => {
						$showNotes = true;
						$showEditor = false;
						$showNavigation = false;
					}}
				>
					back
				</button>

				<label for="title" class="hidden">Title</label>
				<input id="title" type="text" bind:value={$note.title} class="text-lg" />
			</div>

			<div class="flex flex-row items-center gap-2">
				<PopoutMenu>
					<div class="flex flex-col bg-slate-300 py-2">
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
							class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400"
							on:click={downloadNote}
						>
							<Download size={20} />
							<span>Download</span>
						</button>
						<button
							class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 text-yellow-400"
							on:click={archiveNote}
						>
							<Inbox size={20} />
							<span>Archive</span>
						</button>
						<button
							class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 text-red-600"
							on:click={deleteNote}
						>
							<Trash size={20} />
							<span>Delete</span>
						</button>
					</div>
				</PopoutMenu>
			</div>
		</div>

		<div class="flex flex-row flex-wrap">
			<ul class="flex flex-row flex-wrap">
				{#each $noteTags as tag}
					<li class="mr-2">
						<TagChip {tag} />
					</li>
				{/each}
			</ul>

			<!-- search tags -->
			<input
				id="title"
				type="text"
				placeholder="tag"
				class="border-b-2 border-blue-400"
				use:popperRef
				bind:value={searchString}
				on:keyup={searchTags}
			/>

			{#if searchResults.length > 0}
				<ul
					class="z-10 bg-slate-400"
					use:popperContent={extraOpts}
					use:clickOutside
					on:outclick={() => {
						searchResults = [];
						searchString = '';
					}}
				>
					{#each searchResults as option, i}
						<li class="bg-slate-400 hover:bg-slate-300 " class:bg-slate-200={searchIndex === i}>
							<button
								class="px-4 py-1"
								on:click={async () => {
									// add tag to post
									addTagToNote(i);
								}}
							>
								<!-- {option.tag} -->
								<!-- Bold part of string that matches search -->
								{@html option.tag.replace(searchString, `<b>${searchString}</b>`)}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<style></style>
