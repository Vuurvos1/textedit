<script lang="ts">
	import type EasyMDE from 'easymde';

	import { note, notes, updateNote } from '$lib/stores';
	// import { debounce } from '$lib/utils';
	import { onMount } from 'svelte';

	// TODO: rewrite this stylesheet
	import '$lib/easymde.css'; // recommend import css, @option improve common style
	import { saveNote } from '$lib/utils';

	let editor: HTMLElement;

	export let easymde: EasyMDE;

	updateNote.subscribe((value) => {
		console.log('note change');
		// easymde.value($note.content);
		// don't think the undefined check is needed anymore
		if (easymde && $note.content !== undefined) {
			easymde.value($note.content);
		}
	});

	// note.subscribe((value) => {
	// 	console.log('note change');
	// 	if (easymde && value.content !== undefined) {
	// 		easymde.value(value.content);
	// 	}
	// });

	function debounce(func: Function, delay = 250) {
		let timeout: NodeJS.Timeout;
		console.log('a');

		/** @param {any} args */
		return (...args: any) => {
			console.log('b');

			// console.log($note.content);
			$note.content = easymde.value();
			// console.log($note.content);

			// $notes = $notes;

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				console.log('c');
				// $note.content == easymde.value();
				// $notes = $notes;
				func(...args);
			}, delay);
		};
	}

	function save() {
		saveNote();
	}

	// TODO: move this into the note store component?
	// TODO: before you change notes in the sidebar the note should also be saved
	// async function saveNote() {
	// 	console.log('try save');
	// 	if ($note.content == easymde.value()) return;

	// 	localStorage.setItem('note-data', JSON.stringify($notes));

	// 	console.log($note.content);
	// 	$note.content = easymde.value();
	// 	console.log($note.content);

	// 	$notes = $notes;

	// 	// note.save();
	// 	// const res = await fetch('/api/note', {
	// 	// 	method: 'PATCH',
	// 	// 	body: JSON.stringify({ note_id: $note.id, title: $note.title, content: easymde.value() }),
	// 	// 	headers: {
	// 	// 		'content-type': 'application/json'
	// 	// 	}
	// 	// });

	// 	// if (res.ok) {
	// 	// 	return;
	// 	// }
	// }

	onMount(async () => {
		let { default: EasyMDE } = await import('easymde');
		easymde = new EasyMDE({
			element: editor,
			placeholder: 'Type here...',
			toolbar: ['bold', 'italic', 'heading', '|', 'quote'],
			previewImagesInEditor: true
		});

		// easymde.codemirror.on('change', updateNote);
		easymde.codemirror.on('change', debounce(save, 2500));

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
