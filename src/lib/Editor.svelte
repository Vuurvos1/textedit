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

	import 'highlight.js/styles/github-dark.css';

	let element: HTMLDivElement;
	let editor: Editor;

	let outputData: any = '';

	function updateOutputData() {
		console.info('updateOutputData', editor.storage.markdown.getMarkdown());
		// outputData = JSON.stringify(json, null, 2);
		outputData = editor.storage.markdown.getMarkdown();
	}

	onMount(() => {
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
					class: 'prose lg:prose-lg focus:outline-none'
				}
			},
			content: `# Hello World! 🌍️

End of the code
A list item
And another one 

## Hello World! 🌍️

# foo bar

\`\`\`javascript
for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}
\`\`\`

End of the code

- [x] A list item

- [ ] And another one`,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<section class="px-4">
	<button on:click={updateOutputData}>output data</button>

	<div class="editor">
		<div bind:this={element} />
	</div>

	<pre>
{JSON.stringify(outputData).length}
{outputData}
	</pre>
</section>

<style lang="postcss">
	button.active {
		@apply bg-gray-200 text-gray-900;
	}

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
