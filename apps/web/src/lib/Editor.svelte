<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SvelteNodeViewRenderer, createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import Image from '@tiptap/extension-image';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import CodeBlockComponent from '$lib/CodeBlock.svelte';
	import { lowlight } from 'lowlight';
	import { Markdown } from 'tiptap-markdown';
	import CharacterCount from '@tiptap/extension-character-count';
	import { note, noteDirty, notes, updateNote } from '$lib/stores';
	import type { Readable } from 'svelte/store';

	import { saveNote } from '$lib/utils';

	import 'highlight.js/styles/github-dark.css';

	let editor: Readable<Editor>;

	// TODO: there might be a better way to do this
	let noteChanged = true;

	const unsubscribe = updateNote.subscribe(() => {
		if (editor && $note !== undefined) {
			// this shouldn't trigger a save
			noteChanged = true;
			$editor.commands.setContent($note.content);
		}
	});

	function debounce(func: Function, delay = 250) {
		let timeout: NodeJS.Timeout;

		return (...args: any) => {
			$note.content = $editor.storage.markdown.getMarkdown(); // always update store

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
		editor = createEditor({
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				Image,
				CodeBlockLowlight.extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeBlockComponent);
					}
				}).configure({ lowlight }),
				Markdown,
				CharacterCount
			],
			editorProps: {
				attributes: {
					// prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5
					class: 'prose lg:prose-lg focus:outline-none w-full max-w-[initial]'
				}
			},
			onUpdate: debounce(save, 3500),
			content: $note.content || ''
		});
	});

	onDestroy(() => {
		if ($editor) {
			$editor.destroy();
		}
		unsubscribe();
	});
</script>

<div class="editor h-full overflow-y-auto bg-[var(--background-primary)] p-4">
	<EditorContent editor={$editor} />
</div>

<div class="flex justify-end gap-4 border-t px-4 py-1 text-gray-500">
	<!-- <span>
			 lines: {$editor?.storage?.characterCount?.lines() || 0} 
		</span> -->

	<span>
		characters: {$editor?.storage?.characterCount?.characters() || 0}
	</span>

	<span>
		words: {$editor?.storage?.characterCount?.words() || 0}
	</span>
</div>

<style lang="postcss">
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

	.editor :global(ul[data-type='taskList'] input) {
		@apply rounded bg-[var(--background-primary)] accent-black;
	}

	.editor :global(ul[data-type='taskList'] li > div) {
		@apply mb-0 flex-1;
	}

	.editor :global(li > p) {
		@apply my-0;
	}
</style>
