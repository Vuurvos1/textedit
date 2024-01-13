<script lang="ts">
	import { note } from '$lib/stores';
	import { draggable } from '$lib/actions/dragAndDrop';
	import type { FileEntry } from '@tauri-apps/api/fs';

	export let name = '';
	export let path: string;
	export const children: FileEntry[] = [];
	$: type = name.slice(name.lastIndexOf('.') + 1);

	async function loadFile() {
		note.load({ name, path });
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class:bg-gray-200={$note.path === path}
	class="mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm transition duration-100 hover:bg-gray-300/50"
	use:draggable={JSON.stringify({ name, path })}
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
