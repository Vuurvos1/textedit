<script lang="ts">
	import { fileTree, note, searchNoteOpen } from '$lib/stores';
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

{#if $searchNoteOpen}
	<div class="fixed inset-0 z-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				$searchNoteOpen = false;
			}}
			role="button"
			tabindex="-1"
			aria-label="close modal"
			class="absolute inset-0 bg-gray-900/10"
		></div>

		<div
			class="container relative top-16 z-20 mx-auto flex max-h-[70vh] max-w-[80vw] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
		>
			<input
				class="w-full border-b border-gray-200 bg-transparent px-7 py-3"
				type="text"
				placeholder="Search note"
				bind:this={searchInput}
				bind:value={search}
			/>

			<div class="overflow-auto">
				<ul class="  p-4">
					{#each results as file}
						<li>
							<button
								on:click={() => selectFile(file)}
								tabindex="0"
								class="w-full rounded px-3 py-1 text-left transition duration-100 hover:bg-gray-100 focus:bg-pink-100"
							>
								{file.name}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}
