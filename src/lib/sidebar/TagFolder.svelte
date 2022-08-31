<script>
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

<span class:expanded on:click={toggle}># {name}</span>

{#if expanded}
	<ul>
		{#each tags as tag}
			<li>
				{#if tag.tags}
					<svelte:self {...tag} />
				{:else}
					<Tag {...tag} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	span {
		padding: 0 0 0 1.5em;
		/* background: url(/tutorial/icons/folder.svg) 0 0.1em no-repeat; */
		background-size: 1em 1em;
		font-weight: bold;
		cursor: pointer;
	}

	/* .expanded {
		// background-image: url(/tutorial/icons/folder-open.svg);
	} */

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}
</style>
