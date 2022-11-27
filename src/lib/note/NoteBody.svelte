<script lang="ts">
	import type EasyMDE from 'easymde';

	import { note } from '$lib/stores';
	import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';

	// TODO: rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style

	let editor: HTMLElement;

	export let easymde: EasyMDE;

	note.subscribe((value) => {
		if (easymde && value.content !== undefined) {
			easymde.value(value.content);
		}
	});

	// TODO: move this into the note store component?
	// TODO: before you change notes in the sidebar the note should also be saved
	async function saveNote() {
		if ($note.content == easymde.value()) return;

		$note.content = easymde.value();

		const res = await fetch('/api/note', {
			method: 'PATCH',
			body: JSON.stringify({ note_id: $note.id, title: $note.title, content: easymde.value() }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			return;
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
