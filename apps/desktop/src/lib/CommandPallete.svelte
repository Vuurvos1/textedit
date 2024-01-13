<script lang="ts">
	import { shortcuts } from '$lib/shortcuts';
	import { commandPalleteOpen } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	let searchInput: HTMLInputElement | null = null;
	let search = '';

	$: {
		if ($commandPalleteOpen) {
			searchInput?.focus();
		}
	}
</script>

<Modal bind:open={$commandPalleteOpen}>
	<div class="flex w-full flex-col overflow-hidden">
		<input
			class="w-full border-b border-gray-200 bg-transparent px-7 py-3"
			type="text"
			placeholder="Search commands"
			bind:this={searchInput}
			bind:value={search}
		/>

		<div class="overflow-auto">
			<ul class="p-4">
				{#each shortcuts.filter((cut) => cut.name
						.toLowerCase()
						.includes(search.toLowerCase())) as shortcut}
					<li>
						<button
							tabindex="0"
							class="flex w-full flex-row items-center rounded px-3 py-2 transition duration-100 hover:bg-gray-200 focus:bg-pink-100"
							on:click={() => {
								shortcut.action();
								commandPalleteOpen.set(false);
							}}
						>
							{shortcut.name}

							<div class="ml-auto flex flex-row gap-2">
								{#each [shortcut.meta && (navigator.platform === 'MacIntel' ? '⌘' : 'Ctrl'), shortcut.shift && 'Shift', ...shortcut.keys] as key}
									{#if key}
										<kbd
											class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100"
											>{key}</kbd
										>
									{/if}
								{/each}
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Modal>
