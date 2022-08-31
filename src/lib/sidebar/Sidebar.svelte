<script>
	import Tags from './Tags.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;
</script>

<h3>Sidebar</h3>

<Tags {tags} />
