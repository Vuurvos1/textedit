<script>
	import { supabase, user } from '$lib/supabase';
	import { note, notes, noteTags, showEditor, showNavigation, showNotes, tags } from '$lib/stores';
	import { onMount, tick } from 'svelte';

	// TODO rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style
	// rename note.text to note.content?

	import { Save, Download, Trash, Inbox } from '$lib/icons';
	import PopoutMenu from '$lib/ui/PopoutMenu.svelte';
	import Cross from '$lib/icons/Cross.svelte';

	/**
	 * @param {function} func
	 * @param {number} delay
	 */
	function debounce(func, delay = 250) {
		/** @type {setTimeout | any} */
		let timeout;

		/** @param {any} args */
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	// TODO: before you change notes in the sidebar the note should also be saved
	async function saveNote() {
		// test if not the same to prevent feedback loop
		if ($note.text != easymde.value()) {
			$note.text = easymde.value();

			const { data, error } = await supabase
				.from('notes')
				.update({
					user_id: $user?.id,
					title: $note.title,
					text: $note.text
				})
				.match({ id: $note.id }); // TODO add RLS rule for this

			if (!error) {
				console.log('saving note', data);
			} else {
				console.error(error);
			}
		}
	}

	async function archiveNote() {
		$note.text = easymde.value();

		const { data, error } = await supabase
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
		const { error } = await supabase.from('notes').delete().eq('id', $note.id);

		if (!error) {
			$notes = $notes.filter((item) => item.id !== $note.id);
			$note = $notes[0];
		} else {
			console.error(error);
		}

		// $note.text = easymde.value();

		// const { data, error } = await supabase
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

	async function searchTags(ev) {
		// or bind this value within component
		const results = $tags.filter((item) => item.tag.includes(ev.target.value));

		console.log(results);

		// TODO: create a dropdown/context menu for this
		if (ev.key === 'Enter' && results.length > 0) {
			const { data, error } = await supabase.from('note_tags').insert({
				user_id: $user?.id,
				tag_id: results[0].id,
				note_id: $note?.id
			});

			if (error) {
				console.error(error);
			} else {
				console.log(data);
			}
		}

		// console.log(ev.target.value);
		// console.log(results);
	}

	async function addTagToNote(ev) {
		// get note id

		console.log($note.id, $user.id);
		// console.log
		// get tag id
		// add to
		// supabase.
		// note_tag
	}

	/** @type {HTMLElement | undefined} */
	let editor;

	/** @type {import('easymde')} */
	let easymde;

	note.subscribe((value) => {
		if (easymde && value.text != undefined) {
			easymde.value(value.text);
		}
	});

	onMount(async () => {
		let { default: EasyMDE } = await import('easymde');
		easymde = new EasyMDE({
			element: editor,
			placeholder: 'Type here...',
			toolbar: ['bold', 'italic', 'heading', '|', 'quote'],
			previewImagesInEditor: true
		});

		easymde.codemirror.on('change', debounce(saveNote, 5000));

		return () => {
			easymde.cleanup();
		};
	});
</script>

<div class="h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note">
	<div class="flex flex-row gap-4 justify-between items-center flex-wrap px-4 ">
		<!-- TODO: move this to note header component -->
		<div>
			<button
				class="back-button"
				on:click={() => {
					$showNotes = true;
					$showEditor = false;
					$showNavigation = false;
				}}>back</button
			>

			<div class="mb-2">
				<label for="title" class="hidden">Title</label>
				<input id="title" type="text" bind:value={$note.title} class="text-lg" />
			</div>

			<div>
				<!-- search tags -->
				<input
					id="title"
					type="text"
					placeholder="tag"
					class="border-b-2 border-blue-400"
					on:keyup={searchTags}
				/>
			</div>

			<ul class="flex flex-row gap-2">
				{#each $noteTags as tag}
					<li class="flex flex-row">
						<span>
							{tag.tag_id.tag}
						</span>
						<button
							on:click={async () => {
								console.log(tag, $noteTags);

								const { error } = await supabase.from('note_tags').delete().eq('id', tag.id);

								if (error) {
									console.error(error);
								} else {
									// remove tag from note
									$noteTags = $noteTags.filter((t) => t.tag_id.id !== tag.tag_id.id);
								}
							}}
						>
							<Cross size={16} />
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-row items-center gap-2">
			<PopoutMenu>
				<div class="flex flex-col bg-slate-300 py-2">
					<!-- TODO: create icon button component -->
					<button
						class="flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400"
						title="Save note"
						on:click={saveNote}
					>
						<Save />
						<span>(Force) save</span>
					</button>

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

	<div class="h-full">
		<textarea bind:this={editor} />
	</div>
</div>

<style lang="scss">
	button {
		white-space: nowrap;

		// width: max-content;
	}

	// .note {
	// :global() TODO import editor styles here
	// }

	@media (min-width: 768px) {
		.back-button {
			display: none;
		}
	}
</style>
