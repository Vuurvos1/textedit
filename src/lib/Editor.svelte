<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { SvelteNodeViewRenderer } from 'svelte-tiptap';
	import Code from '@tiptap/extension-code';
	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import CodeBlockComponent from '$lib/CodeBlock.svelte';
	import { lowlight } from 'lowlight';

	// import 'highlight.js/styles/github.css';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Document,
				Paragraph,
				Text,
				Code,
				CodeBlockLowlight.extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeBlockComponent);
					}
				}).configure({ lowlight })
			],
			editorProps: {
				attributes: {
					// prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5
					class: 'prose lg:prose-lg focus:outline-none'
				}
			},
			content: `<p>Hello World! 🌍️ </p>
			<pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
			
			`,
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
	{#if editor}
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>

		<button
			on:click={() => editor.chain().focus().toggleCode().run()}
			class:is-active={editor.isActive('code')}
		>
			toggleCode
		</button>
		<button
			on:click={() => editor.chain().focus().setCode().run()}
			disabled={editor.isActive('code')}
		>
			setCode
		</button>
		<button
			on:click={() => editor.chain().focus().unsetCode().run()}
			disabled={!editor.isActive('code')}
		>
			unsetCode
		</button>

		<button
			on:click={() => editor.chain().focus().toggleCodeBlock().run()}
			class:is-active={editor.isActive('codeBlock')}
		>
			toggleCodeBlock
		</button>
		<button
			on:click={() => editor.chain().focus().setCodeBlock().run()}
			disabled={editor.isActive('codeBlock')}
		>
			setCodeBlock
		</button>
	{/if}

	<div class="editor">
		<div bind:this={element} />
	</div>
</section>

<style>
	button.active {
		background: black;
		color: white;
	}

	/* .editor :global(.ProseMirror-focused) {
		outline: none;
	} */

	/* Basic editor styles */
	.editor :global(.ProseMirror > * + *) {
		margin-top: 0.75em;
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
