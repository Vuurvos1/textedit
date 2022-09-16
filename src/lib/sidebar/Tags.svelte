<script>
	import Hash from '$lib/icons/Hash.svelte';
	import { supabase, user } from '$lib/supabase';
	import { tick } from 'svelte';
	import Tag from './Tag.svelte';
	import TagFolder from './TagFolder.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;

	let addingTag = false;

	let tag = '';
	let tagInput;

	async function addTag() {
		if (tag === '') {
			console.log('empty tag');
			addingTag = false;
			return;
		}

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
	<div class="flex flex-row justify-between px-4">
		<h3 class="font-bold font-lg">Tags</h3>

		<button
			on:click={async () => {
				addingTag = true;
				await tick;
				tagInput.focus();
			}}>add +</button
		>
	</div>

	<ul>
		{#if addingTag}
			<li class="flex flex-row items-center">
				<Hash size={16} />
				<input
					id="tag"
					type="text"
					bind:this={tagInput}
					bind:value={tag}
					on:blur={() => {
						console.log('blur');
						addingTag = false;
					}}
				/>
				<button on:click={addTag}>add +</button>
			</li>
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
