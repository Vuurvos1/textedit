<script lang="ts">
	import { fileTree, note, searchNoteOpen } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
	import type { FileEntry } from '@tauri-apps/api/fs';

	// TODO: maybe debounce search
	let search = '';
	let results = [];
	let searchInput: HTMLInputElement | null = null;

	// TODO: implement fuzzy search based on full file path
	function searchFileTree(fileTree, searchQuery) {
		const results = [];

		function searchNode(node) {
			const nodeNameLowerCase = node.name.toLowerCase();

			if (nodeNameLowerCase.includes(searchQuery.toLowerCase()) && !node.children) {
				results.push(node);
			}

			if (node.children && node.children.length > 0) {
				for (const childNode of node.children) {
					searchNode(childNode);
				}
			}
		}

		for (const node of fileTree) {
			searchNode(node);
		}

		return results;
	}

	$: {
		results = searchFileTree($fileTree, search);
	}

	$: {
		if ($searchNoteOpen) {
			searchInput?.focus();
		}
	}

	function selectFile(file: FileEntry) {
		note.load(file);
		searchNoteOpen.set(false);
	}
</script>

<Modal bind:open={$searchNoteOpen}>
	<div class="flex w-full flex-col">
		<input
			class="w-full border-b bg-transparent px-7 py-3"
			type="text"
			placeholder="Search note"
			bind:this={searchInput}
			bind:value={search}
		/>

		<div class="overflow-auto">
			<ul class="p-4">
				{#each results as file}
					<li>
						<button
							on:click={() => selectFile(file)}
							tabindex="0"
							class="hover:bg-hover focus:bg-hover w-full rounded px-3 py-1 text-left transition duration-100"
						>
							{file.name}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Modal>
