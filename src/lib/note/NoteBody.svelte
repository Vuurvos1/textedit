<script lang="ts">
	import type EasyMDE from 'easymde';

	import { note, noteDirty, notes, updateNote } from '$lib/stores';
	import { onMount } from 'svelte';

	// TODO: rewrite this stylesheet
	import '$lib/easymde.scss'; // @option improve common style
	import { saveNote } from '$lib/utils';

	export let easymde: EasyMDE;

	let editor: HTMLElement;

	// TODO: there might be a better way to do this
	let noteChanged = true;

	const unsubscribe = updateNote.subscribe(() => {
		if (easymde && $note !== undefined) {
			// this shouldn't trigger a save
			noteChanged = true;
			easymde.value($note.content);
		}
	});

	function debounce(func: Function, delay = 250) {
		let timeout: NodeJS.Timeout;

		return (...args: any) => {
			$note.content = easymde.value(); // always update store

			if (!noteChanged) {
				$noteDirty = true;
				$note.updated_at = new Date().toISOString();
				$notes = $notes;
			}

			if (noteChanged) {
				noteChanged = false;
			}

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	function save() {
		saveNote();
		localStorage.setItem('note-data', JSON.stringify($notes));
	}

	onMount(async () => {
		let { default: EasyMDE } = await import('easymde');
		easymde = new EasyMDE({
			element: editor,
			placeholder: 'Type here...',
			toolbar: ['bold', 'italic', 'heading', '|', 'quote'],
			previewImagesInEditor: true
		});

		easymde.codemirror.on('change', debounce(save, 3500));

		if ($note.content !== undefined) {
			easymde.value($note.content);
		}

		return () => {
			easymde.cleanup();
			unsubscribe();
		};
	});
</script>

<div class="h-full overflow-hidden">
	<textarea bind:this={editor} />
</div>

<style>
</style>
