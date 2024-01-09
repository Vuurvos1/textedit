<script lang="ts">
	import { Chevron } from '$lib/icons';
	import Hash from '$lib/icons/Hash.svelte';
	import { filteredNotes, note, noteFilter } from '$lib/stores';
	import Tag from './Tag.svelte';

	import type { TagFolder } from '$lib/sidebar/tags';

	export let expanded = true;
	export let name: string;
	export let before = '';
	export let children: TagFolder[];

	function toggle() {
		expanded = !expanded;
	}
</script>

<span
	class:expanded
	class="flex cursor-pointer flex-row items-center pl-4 font-bold hover:bg-indigo-600"
	on:click|stopPropagation={() => {
		$noteFilter.tag = before === '' ? name : before + '/' + name;
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
		{#each children as tag}
			<li class="py-0.5">
				{#if tag.children && tag.children.length > 0}
					<svelte:self {...tag} before={before === '' ? name : before + '/' + name} />
				{:else}
					<Tag name={tag.name} before={before === '' ? name : before + '/' + name} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="postcss">
</style>
