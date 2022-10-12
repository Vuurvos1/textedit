<script>
	import { supabase, user } from '$lib/supabase';
	import { note, showEditor, showNavigation, showNotes } from '$lib/stores';
	import { onMount } from 'svelte';

	// TODO rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style
	import { Save, MoreHorizontal } from '$lib/icons';
	// rename note.text to note.content?

	async function saveNote() {
		$note.text = easymde.value();

		const { data, error } = await supabase
			.from('notes')
			.update({
				user_id: $user?.id,
				title: $note.title,
				text: $note.text
			})
			.match({ id: $note.id }); // TODO add RLS rule for this

		console.log(data, error);
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
		$note.text = easymde.value();

		const { data, error } = await supabase
			.from('notes')
			.update({
				user_id: $user?.id,
				status: 'deleted' // TODO add RLS for valid status ['active', 'archived', 'deleted']
			})
			.match({ id: $note.id }); // TODO add RLS rule for this

		console.log(data, error);
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

	function openNotesList() {}

	/** @type {HTMLElement | undefined} */
	let editor;

	/** @type {import('easymde')} */
	let easymde;

	note.subscribe((value) => {
		if (easymde && value.text) {
			easymde.value(value.text);
		}
	});

	onMount(async () => {
		let { default: EasyMDE } = await import('easymde');
		easymde = new EasyMDE({
			element: editor,
			placeholder: 'Type here...',
			toolbar: ['bold', 'italic', 'heading', '|', 'quote']
		});

		return () => {
			easymde.cleanup();
		};
	});
</script>

<div class="h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note">
	<div class="flex flex-row gap-4 items-center flex-wrap">
		<!-- TODO move this to note header component -->
		<button
			on:click={() => {
				$showNotes = true;
				$showEditor = false;
				$showNavigation = false;
			}}>back</button
		>

		<div>
			<label for="title" class="hidden">Title</label>
			<input id="title" type="text" bind:value={$note.title} />
		</div>

		<button on:click={downloadNote}>Download</button>
		<button on:click={archiveNote}>Archive</button>
		<button on:click={deleteNote}>Delete</button>

		<button class="bg-blue-600 text-white p-2 rounded-full" title="Save note" on:click={saveNote}>
			<Save />
		</button>

		<button>
			<MoreHorizontal />
		</button>
	</div>

	<div class="h-full">
		<textarea bind:this={editor} id="editor" />
	</div>
</div>

<style lang="scss">
	// .note {
	// :global() TODO import editor styles here
	// }
</style>
