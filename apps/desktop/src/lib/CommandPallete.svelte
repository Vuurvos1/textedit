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
			class="w-full border-b bg-transparent px-7 py-3"
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
							class="hover:bg-hover focus:bg-hover flex w-full flex-row items-center rounded px-3 py-2 transition duration-100"
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
											class="bg-bg-primary-alt text-text-base rounded-lg border px-2 py-1.5 text-xs font-semibold"
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
