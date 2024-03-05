<script lang="ts">
	import { fileTree, note } from '$lib/stores';
	import { draggable, contextMenu, clickOutside } from '$lib/actions';
	import { removeFile, renameFile, type FileEntry } from '@tauri-apps/api/fs';
	import { tick } from 'svelte';
	import DeleteDialog from '$lib/DeleteDialog.svelte';

	export let name = '';
	export let path: string;
	export const children: FileEntry[] = [];

	let showConfirmDialog = false;

	$: type = name.slice(name.lastIndexOf('.') + 1);
	$: splitName = name.slice(0, name.lastIndexOf('.'));

	async function loadFile() {
		note.load({ name, path });
	}

	let editing = false;
	let nameInput: HTMLInputElement;
	let editedName = splitName;

	async function handleInput(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const lastIndex = path.lastIndexOf(name);
			const newPath = path.slice(0, lastIndex) + editedName + '.' + type;

			await renameFile(path, newPath.trim());
			fileTree.reload();
			editing = false;
			name = editedName + '.' + type;
		}

		if (event.key === 'Escape') {
			editing = false;
		}
	}
</script>

<!-- TODO add file icons / tags -->
<button
	class:bg-hover={$note.path === path}
	class:border-purple-500={editing}
	class:border-transparent={!editing}
	class="hover:bg-hover focus:bg-hover mb-1 w-full truncate rounded border-2 px-4 py-1 pl-4 text-left text-sm transition duration-100"
	use:draggable={JSON.stringify({ name, path })}
	use:contextMenu={{
		menuItems: [
			{
				icon: 'PenLine',
				label: 'Rename',
				action: async () => {
					editing = true;
					editedName = splitName;
					await tick();
					nameInput.focus();
				}
			},
			{
				icon: 'Trash2',
				label: 'Delete',
				action: () => {
					showConfirmDialog = true;
				}
			}
		]
	}}
	on:click={() => loadFile()}
>
	{#if editing}
		<!-- TODO: change to lil form action? -->
		<input
			class="w-full bg-transparent"
			bind:this={nameInput}
			on:keydown={handleInput}
			use:clickOutside={() => {
				editing = false;
			}}
			type="text"
			bind:value={editedName}
		/>
	{:else}
		<span class="w-full">{splitName}</span>
	{/if}

	<!-- <span>{type}</span> -->
</button>

{#if showConfirmDialog}
	<DeleteDialog
		bind:open={showConfirmDialog}
		title="Delete file"
		path={name}
		onConfirm={async () => {
			await removeFile(path);
			fileTree.reload();
			showConfirmDialog = false;

			// only reset if the deleted file is the current note
			if ($note.path === path) note.reset();
		}}
	/>
{/if}
