<script lang="ts">
	import { readTextFile } from '@tauri-apps/api/fs';
	import { note } from '$lib/stores';
	import { draggable } from '$lib/dragAndDrop';

	export let name: string;
	export let path: string;
	$: type = name.slice(name.lastIndexOf('.') + 1);

	async function loadFile() {
		const fileContents = await readTextFile(path);
		$note = fileContents;
	}

	function handleDragStart(event: DragEvent) {
		event.dataTransfer?.setData('text/plain', path);
		console.info('drag start', path);
	}

	function handleDragEnd(event: DragEvent) {
		event.dataTransfer?.clearData();
		console.info('drag end');
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class="mb-1 w-full truncate rounded bg-pink-100 px-4 py-1 pl-4 text-left text-sm hover:bg-gray-300/50"
	use:draggable={JSON.stringify({ name, path })}
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
