<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import Cross from '$lib/icons/Cross.svelte';
	import type { Tag } from '$lib/sidebar/tags';
	import { note } from '$lib/stores';

	export let tag: Tag;
</script>

<div class="flex flex-row items-center gap-1 rounded bg-blue-300 pl-2">
	<span>
		{tag.name}
	</span>
	<button
		class="rounded bg-inherit p-1 hover:bg-blue-500 hover:text-white"
		on:click={async () => {
			const { error } = await supabaseClient.from('note_tags').delete().eq('id', tag.id);

			if (error) {
				console.error(error);
				return;
			}

			// remove tag from note
			$note.tags = $note.tags.filter((t) => t.id !== tag.id);
		}}
	>
		<Cross size={16} />
	</button>
</div>

<style lang="postcss"></style>
