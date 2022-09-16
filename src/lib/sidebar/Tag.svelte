<script>
	import Hash from '$lib/icons/Hash.svelte';

	/** @type {string} */
	export let name;

	// export let collapsible = false;
</script>

<span class="flex flex-row items-center gap-1 pl-4 hover:bg-indigo-600">
	<div>
		<Hash size="14" />
	</div>
	<div>{name}</div>
</span>

<style lang="scss">
</style>
