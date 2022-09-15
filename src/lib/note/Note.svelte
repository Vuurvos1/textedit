<script>
	import { supabase, user } from '$lib/supabase';
	import { note } from '$lib/stores';

	// rename note.text to note.content?

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
</script>

<div class="h-full w-full bg-cyan-500">
	<label for="title">Title</label>
	<input id="title" type="text" bind:value={$note.title} />

	<textarea
		class="border-2 border-slate-500 border-solid border-r-4 "
		name=""
		id=""
		cols="30"
		rows="10"
		bind:value={$note.text}
	/>

	<button on:click={saveNote}>Save/Update</button>
</div>

<style></style>
