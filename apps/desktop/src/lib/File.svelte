<script lang="ts">
	import { readTextFile } from '@tauri-apps/api/fs';
	import { note } from './stores';

	export let name: string;
	export let path: string;
	$: type = name.slice(name.lastIndexOf('.') + 1);

	async function loadFile() {
		const fileContents = await readTextFile(path);
		$note = fileContents;
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class="mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm hover:bg-gray-300/50"
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
