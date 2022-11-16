<script>
	import { note, user } from '$lib/stores';
	import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';

	// TODO rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style
	import { supabaseClient } from '$lib/db';

	/** @type {HTMLElement | undefined} */
	let editor;

	/** @type {import('easymde')} */
	export let easymde;

	note.subscribe((value) => {
		if (easymde && value.content !== undefined) {
			easymde.value(value.content);
		}
	});

	// TODO: move this into the note store component?
	// TODO: before you change notes in the sidebar the note should also be saved
	async function saveNote() {
		// test if not the same to prevent feedback loop
		if ($note.content != easymde.value()) {
			$note.content = easymde.value();

			const { data, error } = await supabaseClient
				.from('notes')
				.update({
					user_id: $user?.id,
					title: $note.title,
					text: $note.content
				})
				.match({ id: $note.id }); // TODO add RLS rule for this

			if (!error) {
				console.log('saving note', data);
			} else {
				console.error(error);
			}
		}
	}

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

<div class="h-full">
	<textarea bind:this={editor} />
</div>

<style>
</style>
