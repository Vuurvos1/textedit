<script>
	import Cross from '$lib/icons/Cross.svelte';
	import { noteTags } from '$lib/stores';
	import { supabase } from '$lib/supabase';

	export let tag = {};
</script>

<div class="flex flex-row items-center pl-2 gap-1 rounded bg-blue-300">
	<span>
		{tag.name}
	</span>
	<button
		class="bg-inherit p-1 rounded hover:bg-blue-500 hover:text-white"
		on:click={async () => {
			const { error } = await supabase.from('note_tags').delete().eq('id', tag.id);

			if (error) {
				console.error(error);
			} else {
				// remove tag from note
				$noteTags = $noteTags.filter((t) => t.id !== tag.id);
			}
		}}
	>
		<Cross size={16} />
	</button>
</div>

<style lang="scss"></style>
