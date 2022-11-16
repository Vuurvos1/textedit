<script>
	import { supabaseClient } from '$lib/db';
	import { Hash, Plus } from '$lib/icons';
	import { tagFolders, user } from '$lib/stores';
	import { insertTagBefore } from '$lib/tags/tagUtils';
	import { tick } from 'svelte';
	import Tag from './Tag.svelte';
	import TagFolder from './TagFolder.svelte';

	// TODO: allow editing of existing tags

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
		// TODO: make sure the user didn't already add this tag
		if (tag !== '') {
			// submit tag
			const { data, error } = await supabaseClient.from('tags').insert({
				user_id: $user?.id,
				tag: tag
			});

			if (error) {
				console.error(error);
				return;
			}

			$tagFolders = insertTagBefore(
				$tagFolders,
				tag.split('/').filter((tag) => tag)
			);
		}

		addingTag = false;
		tag = '';
	}
</script>

<div class="w-64">
	<div class="flex flex-row justify-between px-4">
		<h3 class="font-bold font-lg">Tags</h3>

		<button
			title="Add new tag"
			on:click={async () => {
				addingTag = true;
				await tick;
				tagInput.focus();
			}}
		>
			<Plus size={20} />
		</button>
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

		{#each $tagFolders as tag}
			<li>
				<!-- this logic seems a bit double and it also in the tag folder -->
				{#if tag.tags && tag.tags.length > 0}
					<TagFolder name={tag.name} tags={tag.tags} expanded />
				{:else}
					<Tag name={tag.name} />
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss"></style>
