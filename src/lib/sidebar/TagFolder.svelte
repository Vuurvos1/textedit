<script>
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import Hash from '$lib/icons/Hash.svelte';
	import Tag from './Tag.svelte';

	export let expanded = true;

	/** @type {string} */
	export let name;

	/** @type {import('./types').Tag[]} */
	export let tags;

	function toggle() {
		expanded = !expanded;
	}
</script>

<span
	class:expanded
	class="flex flex-row items-center pl-4 font-bold cursor-pointer"
	on:click={toggle}
>
	<span style={expanded ? 'transform:rotate(90deg)' : ''} class="origin-center"
		><ChevronDown size="16" /></span
	>
	<span><Hash size="14" /></span>
	<span>{name}</span>
</span>

{#if expanded}
	<ul class="ml-5 border-l border-solid border-slate-100">
		{#each tags as tag}
			<li class="py-0.5">
				{#if tag.tags}
					<svelte:self {...tag} />
				{:else}
					<Tag {...tag} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
</style>
