<script lang="ts">
	import File from './File.svelte';
	import { ChevronRightIcon } from 'lucide-svelte';
	import { closeFolders } from './stores/events';
	import type { FileEntry } from '@tauri-apps/api/fs';

	export let expanded = true;
	export let name;
	export let files: FileEntry[] = [];
	export let depth = 0;

	function toggle() {
		expanded = !expanded;
	}

	closeFolders.subscribe(() => {
		expanded = false;
	});
</script>

<!-- TODO: make folder/file hovers always full width -->
{#if depth > 0}
	<button
		class="flex w-full flex-row items-center gap-2 rounded px-4 py-1 text-sm hover:bg-gray-300/50"
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
	<ul class="overflow-hidden {depth > 0 && `ml-6 border-l border-gray-500/40 pl-2`}">
		{#each files as file}
			<li>
				{#if file.children}
					<svelte:self name={file.name} files={file.children} depth={depth + 1} />
				{:else}
					<File name={file.name} />
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.files {
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.075s ease-out;
	}

	.files.open {
		grid-template-rows: 1fr;
	}
</style>
