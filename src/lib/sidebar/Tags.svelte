<script>
	import Tag from './Tag.svelte';
	import TagFolder from './TagFolder.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;
</script>

<h3>Tags folder <button>+</button></h3>

<ul>
	{#each tags as tag}
		<li>
			{#if tag.tags}
				<TagFolder name={tag.name} tags={tag.tags} expanded />
			{:else}
				<Tag name={tag.name} />
			{/if}
		</li>
	{/each}
</ul>
