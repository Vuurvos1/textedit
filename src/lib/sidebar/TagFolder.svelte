<script>
	import { Chevron } from '$lib/icons';
	import Hash from '$lib/icons/Hash.svelte';
	import { filteredNotes, note, noteFilter } from '$lib/stores';
	import Tag from './Tag.svelte';

	export let expanded = true;

	/** @type {string} */
	export let name;

	/** @type {string} */
	export let before = '';

	/** @type {import('./tags').Tag[]} */
	export let tags;

	function toggle() {
		expanded = !expanded;
	}
</script>

<span
	class:expanded
	class="flex flex-row items-center pl-4 font-bold cursor-pointer hover:bg-indigo-600"
	on:click|stopPropagation={() => {
		$noteFilter.tag = name;
		$note = $filteredNotes[0];
	}}
	on:keydown={(ev) => {
		console.log('hit key on tag folder');
	}}
>
	<button on:click|stopPropagation={toggle}>
		<Chevron size="16" rotation={expanded ? 180 : 90} />
	</button>

	<span><Hash size="14" /></span>
	<span>{name}</span>
</span>

{#if expanded}
	<ul class="ml-5 border-l border-solid border-slate-100">
		{#each tags as tag}
			<li class="py-0.5">
				{#if tag.tags && tag.tags.length > 0}
					<svelte:self {...tag} before={`${before}/${name}`} />
				{:else}
					<Tag {...tag} before={`${before}/${name}`} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
</style>
