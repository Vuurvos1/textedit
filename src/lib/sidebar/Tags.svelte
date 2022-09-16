<script>
	import { supabase, user } from '$lib/supabase';
	import Tag from './Tag.svelte';
	import TagFolder from './TagFolder.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;

	let addingTag = false;

	let tag = '';
	async function addTag() {
		const { data, error } = await supabase.from('tags').insert({
			user_id: $user?.id,
			tag: tag
		});

		console.log(data, error);

		addingTag = false;
		tag = '';
	}
</script>

<div class="w-64">
	<div class="flex flex-row justify-between">
		<h3>Tags folder</h3>

		<button
			on:click={() => {
				addingTag = true;
			}}>add +</button
		>
	</div>

	<ul>
		{#if addingTag}
			<label for="tag">tag</label>
			<input id="tag" type="text" bind:value={tag} />
			<button on:click={addTag}>add +</button>
		{/if}

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
