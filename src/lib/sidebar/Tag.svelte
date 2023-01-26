<script>
	import Hash from '$lib/icons/Hash.svelte';
	import { filteredNotes, note, noteFilter } from '$lib/stores';

	/** @type {string} */
	export let name;

	/** @type {string} */
	export let before = '';
</script>

<button
	class="flex flex-row items-center gap-1  w-full pl-4 cursor-pointer hover:bg-indigo-600"
	on:click|stopPropagation={() => {
		$noteFilter.tag = before === '' ? name : before + '/' + name;
		$note = $filteredNotes[0];
	}}
>
	<div>
		<Hash size="14" />
	</div>
	<div>{name}</div>
</button>

<style lang="scss">
</style>
