<script lang="ts">
	import { note } from '$lib/stores';
	import { draggable } from '$lib/dragAndDrop';

	export let name: string;
	export let path: string;
	$: type = name.slice(name.lastIndexOf('.') + 1);

	async function loadFile() {
		note.load({ name, path });
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class="mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm transition duration-100 hover:bg-gray-300/50"
	use:draggable={JSON.stringify({ name, path })}
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
