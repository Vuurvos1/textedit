<script lang="ts">
	import { onMount } from 'svelte';
	import * as HyperMD from 'hypermd';
	import { debounce } from './utils';
	import { note, noteChange } from './stores';

	import 'highlight.js/styles/github-dark.css';
	import './editor.postcss';

	import CodeMirror from 'codemirror';

	// TODO: don't use fromTextArea after codemirror v6 upgrade
	let myTextarea: HTMLTextAreaElement;
	let editor: any; // TODO: get better type

	const unsubscribe = noteChange.subscribe(() => {
		console.log('note changed', $note.path);
		if (!editor) return;
		editor.setValue($note.content);
	});

	onMount(() => {
		// @ts-ignore needed to get code highlighting working
		window.CodeMirror = CodeMirror;

		editor = HyperMD.fromTextArea(myTextarea, {
			lineNumbers: false,
			gutters: ['CodeMirror-foldgutter', 'HyperMD-goback'],
			theme: 'textedit'
		});

		console.log(myTextarea, HyperMD, editor, CodeMirror);

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

<div class="editor h-full p-4">
	<textarea class="h-full" bind:this={myTextarea}></textarea>
</div>

<style lang="postcss">
	.editor :global(.CodeMirror) {
		@apply h-full;
	}
</style>
