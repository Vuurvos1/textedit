<script>
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let { tags } = data;
	$: ({ tags } = data); // so it stays in sync when `data` changes
</script>

<div class="grid ">
	<div>
		<Sidebar {tags} />
	</div>
	<div>
		<NoteList />
	</div>
	<div>
		<Note />
	</div>
</div>

<!-- <h1>Notes overview</h1> -->
<style lang="scss">
	.grid {
		grid-template-columns: auto auto 1fr;
	}
</style>
