<script lang="ts">
	import { note } from '$lib/stores';
	import { draggable, contextMenu } from '$lib/actions';
	import type { FileEntry } from '@tauri-apps/api/fs';

	export let name = '';
	export let path: string;
	export const children: FileEntry[] = [];
	$: type = name.slice(name.lastIndexOf('.') + 1);

	let button;

	async function loadFile() {
		note.load({ name, path });
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class:bg-gray-200={$note.path === path}
	class="mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm outline-gray-500 transition duration-100 hover:bg-gray-300/50 focus:outline"
	use:draggable={JSON.stringify({ name, path })}
	use:contextMenu={{ options: { target: button } }}
	bind:this={button}
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
