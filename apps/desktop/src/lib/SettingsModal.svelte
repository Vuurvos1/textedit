<script lang="ts">
	import { settingsModalOpen } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
</script>

<Modal bind:open={$settingsModalOpen}>
	<div class="border-r border-[var(--border-color)] p-3">
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

		<h3 class="text-base">Theme</h3>
		<div class="flex flex-row gap-2">
			<label>
				<input type="radio" name="theme" value="light" />
				Light
			</label>
			<label>
				<input type="radio" name="theme" value="dark" />
				Dark
			</label>
			<label>
				<input type="radio" name="theme" value="system" />
				System
			</label>
		</div>
	</div>
</Modal>
