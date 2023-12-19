<script lang="ts">
	import { shortcuts } from '$lib/shortcuts';
	import { commandPalleteOpen } from '$lib/stores';

	let searchInput: HTMLInputElement | null = null;
	let search = '';

	$: {
		if ($commandPalleteOpen) {
			searchInput?.focus();
		}
	}
</script>

{#if $commandPalleteOpen}
	<div class="fixed inset-0 z-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				$commandPalleteOpen = false;
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
	</div>
{/if}
