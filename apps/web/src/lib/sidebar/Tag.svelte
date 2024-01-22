<script lang="ts">
	import Hash from '$lib/icons/Hash.svelte';
	import { filteredNotes, note, noteFilter } from '$lib/stores';

	export let name: string;
	export let before = '';
</script>

<button
	class="flex w-full cursor-pointer flex-row items-center gap-1 pl-4 hover:bg-indigo-600"
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

<style lang="postcss">
</style>
