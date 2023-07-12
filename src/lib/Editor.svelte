<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { SvelteNodeViewRenderer } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import Code from '@tiptap/extension-code';
	import Document from '@tiptap/extension-document';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import Image from '@tiptap/extension-image';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import CodeBlockComponent from '$lib/CodeBlock.svelte';
	import { lowlight } from 'lowlight';
	import { Markdown } from 'tiptap-markdown';
	import { note, noteDirty, notes, updateNote } from '$lib/stores';

	import { saveNote } from '$lib/utils';

	import 'highlight.js/styles/github-dark.css';

	let element: HTMLDivElement;
	let editor: Editor;

	let outputData: any = '';

	function updateOutputData() {
		console.info('updateOutputData', editor.storage.markdown.getMarkdown());
		// outputData = JSON.stringify(json, null, 2);
		outputData = editor.storage.markdown.getMarkdown();
	}

	// TODO: there might be a better way to do this
	let noteChanged = true;

	const unsubscribe = updateNote.subscribe(() => {
		if (editor && $note !== undefined) {
			// this shouldn't trigger a save
			noteChanged = true;
			editor.commands.setContent($note.content);
		}
	});

	function debounce(func: Function, delay = 250) {
		let timeout: NodeJS.Timeout;

		return (...args: any) => {
			$note.content = editor.storage.markdown.getMarkdown(); // always update store

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
		console.info('Saving...');
		saveNote();
		localStorage.setItem('note-data', JSON.stringify($notes));
	}

	onMount(async () => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Document,
				Code,
				CodeBlockLowlight.extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeBlockComponent);
					}
				}).configure({ lowlight }),
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				Image,
				Markdown
			],
			editorProps: {
				attributes: {
					// prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5
					class: 'prose lg:prose-lg focus:outline-none w-full max-w-[initial]'
				}
			},
			onUpdate: debounce(save, 3500),
			content: $note.content || '',
			onTransaction: () => {
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
		unsubscribe();
	});
</script>

<div class="editor h-full overflow-y-auto bg-white p-4">
	<div bind:this={element} />
</div>

<style lang="postcss">
	/* button.active {
		@apply bg-gray-200 text-gray-900;
	} */

	/* Basic editor styles */
	.editor :global(.ProseMirror > * + *) {
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

	.editor :global(ul[data-type='taskList'] li > div) {
		@apply mb-0 flex-1;
	}

	/* .editor :global(.ProseMirror code) { */
	/* background-color: rgba(#616161, 0.1);
		border-radius: 0.25em;
		box-decoration-break: clone;
		color: #616161;
		font-size: 0.9rem;
		padding: 0.25em; */
	/* } */
</style>
