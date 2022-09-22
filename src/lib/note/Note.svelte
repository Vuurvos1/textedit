<script>
	import { supabase, user } from '$lib/supabase';
	import { note } from '$lib/stores';
	import { onMount } from 'svelte';

	// TODO rewrite this stylesheet
	// import 'easymde/dist/easymde.min.css'; // recommend import css, @option improve common style
	import '$lib/easymde.css'; // recommend import css, @option improve common style

	// import { browser } from '$app/environment';

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
			.match({ id: $note.id });

		console.log(data, error);
	}

	/** @type {HTMLElement | undefined} */
	let editor;

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
		<div>
			<label for="title">Title</label>
			<input id="title" type="text" bind:value={$note.title} />
		</div>

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
