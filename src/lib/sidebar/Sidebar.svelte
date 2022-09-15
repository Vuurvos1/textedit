<script>
	import Auth from '$lib/Auth.svelte';
	import Tags from './Tags.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;
</script>

<div class="bg-slate-300">
	<!-- <h3>Sidebar</h3> -->

	<ul>
		<li>Notes</li>
		<li>Untaged</li>
		<li>Archived</li>
		<li>Deleted</li>
	</ul>

	<Tags {tags} />

	<Auth />
</div>

<style lang="scss"></style>
