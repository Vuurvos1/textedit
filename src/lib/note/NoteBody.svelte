<script lang="ts">
	import type EasyMDE from 'easymde';

	import { note, notes, updateNote } from '$lib/stores';
	// import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';

	// TODO: rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style
	import { saveNote } from '$lib/utils';

	export let easymde: EasyMDE;

	let editor: HTMLElement;

	updateNote.subscribe((value) => {
		console.log('note change');
		// don't think the undefined check is needed anymore
		if (easymde && $note.content !== undefined) {
			easymde.value($note.content);
		}
	});

	function debounce(func: Function, delay = 250) {
		let timeout: NodeJS.Timeout;

		/** @param {any} args */
		return (...args: any) => {
			// always update store
			$note.content = easymde.value();

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

		easymde.codemirror.on('change', debounce(save, 2500));

		if ($note.content !== undefined) {
			easymde.value($note.content);
		}

		return () => {
			easymde.cleanup();
		};
	});
</script>

<div class="h-full overflow-hidden">
	<textarea bind:this={editor} />
</div>

<style>
</style>
