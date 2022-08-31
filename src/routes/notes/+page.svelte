<script>
	import Sidebar from '$lib/sidebar/Sidebar.svelte';

	export let data;
	let { tags } = data;
	$: ({ tags } = data); // so it stays in sync when `data` changes
</script>

<h1>Notes overview</h1>

<Sidebar {tags} />

<pre>
  {JSON.stringify(data, null, 2)}
</pre>
