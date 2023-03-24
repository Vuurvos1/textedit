<script>
	import { onMount, onDestroy } from 'svelte';

	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	// import { createMarkdownEditor } from 'tiptap-markdown';

	import Heading from '@tiptap/extension-heading';
	import Bold from '@tiptap/extension-bold';

	// import { keymap } from 'prosemirror-commands';
	// import {} from '@tiptap/pm/keymap';
	// import {} from '@tiptap/pm/markdown';
	// import {setBlockType } from '@tiptap/pm/commands';

	/** @type {HTMLDivElement | undefined} */
	let element;
	/** @type {Editor} */
	let editor;

	// const myKeymap = keymap({
	//   // Map Ctrl+Alt+L to insert a link
	//   "Ctrl-Alt-L": (state, dispatch) => {
	//     const text = "Link Text";
	//     const url = "https://www.example.com";
	//     const attrs = { href: url, title: text };
	//     dispatch(state.tr.replaceSelectionWith(state.schema.text(text, attrs)));
	//     return true;
	//   }
	// });

	// // Add the keymap to the editor props
	// const editor = new Editor({
	//   content: "...",
	//   extensions: [
	//     // ...other extensions...
	//     myKeymap,
	//   ],
	// });

	// const MarkdownEditor = createMarkdownEditor(Editor);

	// addCommands() {
	// 	return {
	// 		toggleHeading:
	// 			({ level }) =>
	// 			({ commands }) => {
	// 				// console.log('toggleHeading', level);
	// 				return commands.toggleHeading({ level });
	// 			}
	// 	};
	// },
	// addKeyboardShortcuts() {
	// 	return {
	// 		'Mod-Alt-1': () => this.editor.commands.toggleHeading({ level: 1 }),
	// 		'Mod-Alt-2': () => this.editor.commands.toggleHeading({ level: 2 }),
	// 		'Mod-Alt-3': () => this.editor.commands.toggleHeading({ level: 3 }),
	// 		'Mod-Alt-4': () => this.editor.commands.toggleHeading({ level: 4 }),
	// 		'Mod-Alt-5': () => this.editor.commands.toggleHeading({ level: 5 }),
	// 		'Mod-Alt-6': () => this.editor.commands.toggleHeading({ level: 6 })
	// 	};
	// }

	// editor = new MarkdownEditor({
	// 	element: element,
	// 	content: '# Title',
	// 	extensions: [StarterKit],
	// 	onTransaction: () => {
	// 		// force re-render so `editor.isActive` works as expected
	// 		editor = editor;
	// 	},

	// });
	// const markdownOutput = editor.getMarkdown();

	// console.log(markdownOutput);

	// toggleHeading: ({ level }) => {
	// 	console.log('toggleHeading', level);
	// 	return ({ commands }) => {
	// 		console.log('toggleHeading', level);
	// 		return commands.toggleHeading({ level });
	// 	};
	// }

	// toggleHeading: ({ level }) => {
	// 				return ({ commands }) => {
	// 					console.log('toggleHeading', level);
	// 					return commands.toggleHeading({ level });
	// 				};
	// 			}

	const CustomBold = Bold.extend({
		addCommands() {
			return {
				customBold: (attributes) => (editor) => {
					const { state, commands } = editor;

					const { from, to, ranges } = state.selection; // selected range
					console.log(state.selection, from, to);

					/** @type {string} */
					const text = state.doc.textBetween(from, to); // selected text

					// TODO: handle selection of multiple nodes
					// console.log(ranges.length);

					// ranges.forEach((range) => {
					// 	const { $from: from, $to: to } = range;

					// 	console.log(from, to);

					// 	const text = state.doc.textBetween(from.pos, to.pos);

					// 	console.log(text);

					// 	if (!text.startsWith('**') || !text.endsWith('**')) {
					// 		const boldText = `**${text}**`;
					// 		const tr = editor.state.tr.replaceWith(from.pos, to.pos, state.schema.text(boldText));
					// 		editor.dispatch(tr);
					// 	}
					// });

					// return commands.toggleBold();
					// },

					if (text.startsWith('**') && text.endsWith('**')) {
						const tr = state.tr.replaceWith(from, to, state.schema.text(text.slice(2, -2)));
						editor.dispatch(tr);

						return commands.toggleBold();
					}

					const tr = state.tr.replaceRangeWith(from, to, state.schema.text(`**${text}**`));
					editor.dispatch(tr);

					return commands.toggleBold();
				}
			};
		},
		addKeyboardShortcuts() {
			return {
				'Mod-Alt-b': () => this.editor.commands.customBold()
			};
		}
	});

	const CustomHeading = Heading.extend({
		addCommands() {
			return {
				cycleHeading: (attributes) => (editor) => {
					const { state, commands } = editor;

					const { $from } = state.selection;
					const node = $from.node();

					if (!node) return false;

					if (node.type.name === 'heading') {
						const level = node.attrs.level;
						console.log(`Current heading level: ${level}`);

						if (level === 6) {
							return commands.toggleNode(this.name, 'paragraph', attributes);
						}

						return commands.toggleNode(this.name, this.name, {
							...attributes,
							level: level + 1
						});
					}

					if (node.type.name === 'paragraph') {
						return commands.toggleNode(this.name, this.name, {
							...attributes,
							level: 1
						});
					}

					console.log('Selection is not a heading or paragraph block');

					// if (node && node.type.name === 'heading') {
					// 	const level = node.attrs.level;
					// 	console.log(`Current heading level: ${level}`);
					// } else {
					// 	console.log('Selection is not a heading block');
					// }

					// return commands.cycleHeading(attributes);
					// if (!this.options.levels.includes(attributes.level)) {
					// 	return false;
					// }
					// return commands.toggleNode(this.name, 'paragraph', attributes);

					return false;
				}
			};
		},
		addKeyboardShortcuts() {
			return {
				'Mod-Alt-h': () => this.editor.commands.cycleHeading()
			};
		}
	});

	// console.log(CustomHeading);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [CustomHeading, CustomBold, StarterKit],
			content: `
      <p>Hello World! 🌍️ </p>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <p></p>
      <p>Some text</p>
      `,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	console.log(editor?.commands, editor);

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

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
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
