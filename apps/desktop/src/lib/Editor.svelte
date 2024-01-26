<script lang="ts">
	import { onMount } from 'svelte';
	import * as HyperMD from 'hypermd';
	import { debounce } from './utils';
	import { note, noteChange } from './stores';

	// import 'highlight.js/styles/github-dark.css';

	// TODO: don't use fromTextArea
	let myTextarea: HTMLTextAreaElement;
	let editor: any; // TODO: get better type

	const unsubscribe = noteChange.subscribe(() => {
		console.log('note changed', $note.path);
		if (!editor) return;
		editor.setValue($note.content);
	});

	onMount(() => {
		editor = HyperMD.fromTextArea(myTextarea, {
			lineNumbers: false,
			gutters: ['CodeMirror-foldgutter', 'HyperMD-goback']
		});

		console.log(myTextarea, HyperMD, editor);

		editor.on('change', () => {
			note.updateContent(editor.getValue());
		});

		editor.on(
			'change',
			debounce(() => {
				note.save();
			}, 1500)
		);

		return () => {
			// editor.destroy();
			unsubscribe();
		};
	});
</script>

<!-- <div class="editor h-full overflow-y-auto bg-[var(--background-primary)] p-4">
</div> -->

<!-- <div class="flex justify-end gap-4 border-t px-4 py-1 text-gray-500"> -->

<div class="editor h-full">
	<textarea class="h-full" bind:this={myTextarea}></textarea>
</div>

<style lang="postcss">
	.editor :global(.CodeMirror) {
		@apply h-full;
	}

	/* Basic editor styles */
	/* .editor :global(.ProseMirror > * + *) {
		@apply mt-3;
	}

	.editor :global(ul[data-type='taskList']) {
		@apply list-none p-0;
	}

	.editor :global(ul[data-type='taskList'] p) {
		@apply m-0;
	}
	.editor :global(ul[data-type='taskList'] li) {
		@apply flex items-start leading-snug;
	}

	.editor :global(ul[data-type='taskList'] li > label) {
		flex: 0 0 auto;
		@apply m-0 mr-2 select-none;
	}

	.editor :global(ul[data-type='taskList'] input) {
		@apply rounded bg-[var(--background-primary)] accent-black;
	}

	.editor :global(ul[data-type='taskList'] li > div) {
		@apply mb-0 flex-1;
	}

	.editor :global(li > p) {
		@apply my-0;
	} */
</style>
