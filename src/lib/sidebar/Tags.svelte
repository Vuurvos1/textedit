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
	/** @type {HTMLInputElement} */
	let tagInput;

	/** @param {KeyboardEvent} ev */
	function tagKeydown(ev) {
		if (ev.key === 'Enter') {
			addTag();
		}
	}

	async function addTag() {
		if (tag !== '') {
			// submit tag
			const { data, error } = await supabase.from('tags').insert({
				user_id: $user?.id,
				tag: tag
			});

			if (error) {
				console.error(error);
			}

			console.log(data);
		}

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
			<li class="flex flex-row items-center gap-1 px-4">
				<Hash size={14} />
				<input
					type="text"
					name="tag"
					class="w-full outline-none bg-transparent"
					bind:this={tagInput}
					bind:value={tag}
					on:keydown={tagKeydown}
					on:focusout={() => {
						addingTag = false;
					}}
				/>
				<button on:click={addTag}>+</button>
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
