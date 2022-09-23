<script>
	import { supabase, user } from '$lib/supabase';
	import { note } from '$lib/stores';
	import { onMount } from 'svelte';

	// TODO rewrite this stylesheet
	// import 'easymde/dist/easymde.min.css'; // recommend import css, @option improve common style
	import '$lib/easymde.css'; // recommend import css, @option improve common style

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
				// title: $note.title,
				// text: $note.text,
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
				// title: $note.title,
				// text: $note.text,
				status: 'deleted'
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
		URL.revokeObjectURL(url); // Object URLs should be revoked after use
		// TODO also remove link element?
	}

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
	<div class="flex flex-row gap-4 items-center">
		<!-- TODO move this to note header component -->
		<div>
			<label for="title">Title</label>
			<input id="title" type="text" bind:value={$note.title} />
		</div>

		<button on:click={downloadNote}>Download</button>
		<button on:click={archiveNote}>Archive</button>
		<button on:click={deleteNote}>Delete</button>

		<button class="bg-blue-600 text-white px-4 py-1 rounded" on:click={saveNote}>
			Save/Update
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
