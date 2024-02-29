<script lang="ts">
	import { settingsModalOpen, theme, type Theme } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';

	const themeOptions = [
		{
			name: 'Light',
			value: 'light'
		},
		{
			name: 'Dark',
			value: 'dark'
		},
		{
			name: 'System',
			value: 'system'
		}
	];

	let selectedTheme: Theme | 'system' = 'dark';

	$: {
		if (selectedTheme === 'system') {
			theme.set(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
		} else {
			theme.set(selectedTheme);
		}
	}
</script>

<Modal bind:open={$settingsModalOpen}>
	<div class="flex min-h-[60vh] flex-row">
		<div class="border-border-divider border-r p-3">
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

		<div class="flex flex-col p-3">
			<div class="text-lg">Settings</div>

			<h3 class="text-base font-medium">Theme</h3>
			<div class="flex flex-row gap-2">
				{#each themeOptions as theme}
					<label>
						<input type="radio" name="theme" value={theme.value} bind:group={selectedTheme} />
						{theme.name}
					</label>
				{/each}
			</div>
		</div>
	</div>
</Modal>
