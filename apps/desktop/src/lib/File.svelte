<script lang="ts">
	import { fileTree, note } from '$lib/stores';
	import { draggable, contextMenu } from '$lib/actions';
	import { removeFile, type FileEntry } from '@tauri-apps/api/fs';

	export let name = '';
	export let path: string;
	export const children: FileEntry[] = [];
	// $: type = name.slice(name.lastIndexOf('.') + 1);

	async function loadFile() {
		note.load({ name, path });
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class:bg-hover={$note.path === path}
	class="hover:bg-hover focus:bg-hover mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm transition duration-100"
	use:draggable={JSON.stringify({ name, path })}
	use:contextMenu={{
		menuItems: [
			{
				icon: 'PenLine',
				label: 'Rename',
				action: () => {
					// TODO
				}
			},
			{
				icon: 'Trash2',
				label: 'Delete',
				action: () => {
					// TODO: confirm modal
					removeFile(path);
					fileTree.reload();
				}
			}
		]
	}}
	on:click={() => loadFile()}
>
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
