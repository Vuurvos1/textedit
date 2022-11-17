<script>
	import { Chevron } from '$lib/icons';
	import Hash from '$lib/icons/Hash.svelte';
	import Tag from './Tag.svelte';

	export let expanded = true;

	/** @type {string} */
	export let name;

	/** @type {import('./tags').Tag[]} */
	export let tags;

	function toggle() {
		expanded = !expanded;
	}
</script>

<span
	class:expanded
	class="flex flex-row items-center pl-4 font-bold cursor-pointer hover:bg-indigo-600"
	on:click={toggle}
	on:keydown={(ev) => {
		console.log('hit key on tag folder');
	}}
>
	<Chevron size="16" rotation={expanded ? 180 : 90} />

	<span><Hash size="14" /></span>
	<span>{name}</span>
</span>

{#if expanded}
	<ul class="ml-5 border-l border-solid border-slate-100">
		{#each tags as tag}
			<li class="py-0.5">
				{#if tag.tags && tag.tags.length > 0}
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
