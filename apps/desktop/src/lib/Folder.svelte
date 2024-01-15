<script lang="ts">
	import File from './File.svelte';
	import { ChevronRightIcon } from 'lucide-svelte';
	import { draggable, dropzone } from '$lib/actions/dragAndDrop';
	import { renameFile, BaseDirectory, type FileEntry } from '@tauri-apps/api/fs';
	import { fileTree, closeFolders } from '$lib/stores';

	export let expanded = true;
	export let name: string;
	export let path: string;
	export let children: FileEntry[] = [];
	export let depth = 0;

	function toggle() {
		expanded = !expanded;
	}

	closeFolders.subscribe(() => {
		expanded = false;
	});

	async function moveFile(data) {
		const newPath = `${path}/${data.name}`;
		await renameFile(data.path, newPath, { dir: BaseDirectory.Document });
		expanded = true;
		fileTree.reload();
	}
</script>

<!-- TODO: make folder/file hovers always full width -->
{#if depth > 0}
	<button
		class="folder hover:bg-hover flex w-full flex-row items-center gap-2 rounded px-4 py-1 text-sm"
		use:draggable={JSON.stringify({ name, path })}
		use:dropzone={{
			dragoverClasses: ['droppable', 'bg-blue-300'],
			onDropzone: (data, ev) => {
				const d = JSON.parse(data);
				moveFile(d);
			}
		}}
		on:click={toggle}
	>
		<div class="transition" class:rotate-90={expanded}>
			<ChevronRightIcon size="16" />
		</div>
		<span class="truncate">
			{name}
		</span>
	</button>
{/if}

<div class:open={expanded || depth === 0} class="files grid">
	<ul class="overflow-y-hidden {depth > 0 && `ml-6 border-l border-gray-500/40 pl-2`}">
		{#each children as file}
			<li>
				{#if file.children}
					<svelte:self depth={depth + 1} {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.files {
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.075s ease-out;
	}

	.files.open {
		grid-template-rows: 1fr;
	}

	.folder:global(.droppable) {
	}

	.folder:global(.droppable) * {
		pointer-events: none;
	}
</style>
