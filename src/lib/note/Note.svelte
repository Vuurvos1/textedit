<script>
	import { supabase, user } from '$lib/supabase';
	import { note } from '$lib/stores';
	import { onMount } from 'svelte';

	import 'quilljs-markdown/quilljs-markdown-common-style.scss'; // recommend import css, @option improve common style
	import 'quill/dist/quill.snow.css'; // recommend import css, @option improve common style
	import 'easymde/dist/easymde.min.css'; // recommend import css, @option improve common style
	// import EasyMDE from 'easymde';
	import { browser } from '$app/environment';

	// rename note.text to note.content?

	// {
	// 		modules: {
	// 			toolbar: toolbarOptions
	// 		},
	// 		theme: 'snow',
	// 		placeholder: 'Write your story...'
	// 	}
	async function saveNote() {
		console.log($note);

		const { data, error } = await supabase
			.from('notes')
			.update({
				user_id: $user?.id,
				title: $note.title,
				text: $note.text
			})
			.match({ id: $note.id });

		console.log(data, error);
	}

	// onMount(async () => {
	// 	console.log(editor);

	// 	// const easymde = new EasyMDE();

	// 	console.log(Quill, QuillMarkdown);

	// 	// easyMDE = new EasyMDE();
	// 	let quill = new Quill(editor, options);

	// 	const markdownOptions = {
	// 		// 	/**
	// 		//  ignoreTags: [ 'pre', 'strikethrough'], // @option - if you need to ignore some tags.
	// 		//  tags: { // @option if you need to change for trigger pattern for some tags.
	// 		//   blockquote: {
	// 		//     pattern: /^(\|){1,6}\s/g,
	// 		//   },
	// 		//   bold: {
	// 		//     pattern:  /^(\|){1,6}\s/g,
	// 		//   },
	// 		//   italic: {
	// 		//     pattern: /(\_){1}(.+?)(?:\1){1}/g,
	// 		//   },
	// 		// },
	// 		// */
	// 	};

	// 	// // markdown is enabled
	// 	// const quillMarkdown = new QuillMarkdown(quill, markdownOptions);

	// 	// markdown is now disabled
	// 	// quillMarkdown.destroy()
	// });

	let quill = null;
	/** @type {HTMLElement | undefined} */
	let editor;

	note.subscribe((value) => {
		if (quill) {
			quill.setText(value.text);
		}
	});

	onMount(async () => {
		const { default: Quill } = await import('quill');

		// quill = new Quill(editor, {
		// 	modules: {
		// 		toolbar: [
		// 			[{ header: [1, 2, 3, false] }],
		// 			['bold', 'italic', 'underline', 'strike'],
		// 			['link', 'code-block']
		// 		]
		// 	},
		// 	placeholder: 'Type something...',
		// 	theme: 'snow' // or 'bubble'
		// });

		// if ($note?.text) {
		// 	quill.setText($note.text);
		// }

		// const QuillMarkdown = await (await import('quilljs-markdown')).default;

		// // markdown is enabled
		// const quillMarkdown = new QuillMarkdown(quill, {});

		let { default: EasyMDE } = await import('easymde');
		console.log(EasyMDE);
		let easymde = new EasyMDE({
			element: editor,
			placeholder: 'Type here...',
			toolbar: ['bold', 'italic', 'heading', '|', 'quote']
		});

		return () => {
			// quillMarkdown.destroy();
			// quill.enabled(false);
			// quill = null;
		};
	});
</script>

<div class="h-full w-full bg-gray-100">
	<div class="flex flex-row gap-4 items-center">
		<div>
			<label for="title">Title</label>
			<input id="title" type="text" bind:value={$note.title} />
		</div>

		<button class="bg-blue-600 text-white px-4 py-1 rounded" on:click={saveNote}>
			Save/Update
		</button>
	</div>

	<!-- <textarea
		class="border-2 border-slate-500 border-solid border-r-4 "
		name=""
		id=""
		cols="30"
		rows="10"
		bind:value={$note.text}
	/> -->

	<div>
		<textarea bind:this={editor} id="editor" />
	</div>
</div>

<style></style>
