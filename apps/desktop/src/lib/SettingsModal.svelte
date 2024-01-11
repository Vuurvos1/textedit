<script lang="ts">
	import { settingsModalOpen } from '$lib/stores';
</script>

{#if $settingsModalOpen}
	<div class="fixed inset-0 z-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				$settingsModalOpen = false;
			}}
			role="button"
			tabindex="-1"
			aria-label="close modal"
			class="absolute inset-0 bg-gray-900/10"
		></div>

		<div
			class="container relative top-16 z-20 mx-auto flex h-[80vh] max-h-[70vh] max-w-[80vw] flex-row overflow-hidden rounded-lg border border-gray-200 bg-white"
		>
			<div class="border-r p-3">
				<h2 class="mb-1 px-3 text-sm font-semibold text-gray-500">Settings</h2>

				<ul class="flex flex-col">
					<li>
						<!-- TODO: create genric button style -->
						<button class="w-full rounded px-3 py-0.5 text-left transition hover:bg-blue-400"
							>Appearance</button
						>
					</li>

					<li>
						<button class="w-full rounded px-3 py-0.5 text-left transition hover:bg-blue-400"
							>Hotkeys</button
						>
					</li>
				</ul>
			</div>

			<div class="p-3">Settings</div>
		</div>
	</div>
{/if}
