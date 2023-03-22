<script>
	import { onMount } from 'svelte';

	// import { keymap } from '@codemirror/view';
	// import { EditorState, StateEffect } from '@codemirror/state';
	// import { defaultKeymap, indentWithTab } from '@codemirror/commands';
	// import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
	// import { indentUnit } from '@codemirror/language';

	import { basicSetup, EditorView } from 'codemirror';
	import { markdown, markdownKeymap, markdownLanguage } from '@codemirror/lang-markdown';
	import { languages } from '@codemirror/language-data';

	import { marked } from 'marked';

	const markdownText = `
# Hello

This is a paragraph

## This is a subheading

This is another paragraph

- This is a list item
- This is another list item

\`\`\`javascript
let x = 'y'
\`\`\`
`;

	/** @type {HTMLDivElement | undefined} */
	let editorElement;

	onMount(() => {
		console.log('mounting');

		// const myView = new EditorView({
		// 	state: EditorState.create({
		// 		doc: markdownText,
		// 		extensions: [
		// 			basicSetup,
		// 			keymap.of([...defaultKeymap, ...markdownKeymap]),
		// 			markdown({
		// 				codeLanguages: [languages]
		// 			}),
		// 			syntaxHighlighting(defaultHighlightStyle)

		// 			// keymap.of([markdownKeymap()])
		// 			// keymap.of([defaultKeymap]),
		// 			// keymap.of([indentWithTab]),

		// 			// markdown({
		// 			// 	// base: markdownLanguage
		// 			// })
		// 		]
		// 	}),
		// 	parent: editorElement
		// });

		const view = new EditorView({
			doc: markdownText,
			extensions: [basicSetup, markdown({ codeLanguages: languages })],
			parent: editorElement
		});

		// myView.dispatch({
		// 	changes: { from: 0, insert: 'hello' }
		// });

		return () => {
			console.log('unmounting');
			view.destroy();
		};
	});
</script>

<div class="rounded border-2">
	<div bind:this={editorElement} id="editor" />
	<!-- <textarea id="editor" class="h-96 w-full focus:outline-none" /> -->
</div>

<div>{@html marked(markdownText)}</div>

<style lang="scss">
	//
</style>
