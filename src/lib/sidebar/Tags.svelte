<script>
	import Tag from './Tag.svelte';
	import TagFolder from './TagFolder.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;
</script>

<div class="w-64">
	<div class="flex flex-row justify-between">
		<h3>Tags folder</h3>
		<button>+</button>
	</div>

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
</div>

<style lang="scss"></style>
