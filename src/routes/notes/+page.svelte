<script>
	import NoteList from '$lib/NoteList.svelte';
	import Note from '$lib/note/Note.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import Footer from '$lib/Footer.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let { tags } = data;
	$: ({ tags } = data); // so it stays in sync when `data` changes
</script>

<div class="grid">
	<div>
		<Sidebar {tags} />
	</div>
	<div>
		<NoteList />
	</div>
	<div>
		<!-- TODO if note is selected or select default note -->
		<Note />
	</div>
</div>

<Footer />

<style lang="scss">
	.grid {
		grid-template-columns: auto auto 1fr;
		height: calc(100vh - 2rem);
	}
</style>
