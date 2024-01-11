<script lang="ts">
	import { appWindow } from '@tauri-apps/api/window';
	import { MinusIcon, SquareIcon, XIcon } from 'lucide-svelte';
</script>

<div
	data-tauri-drag-region
	class="flex select-none flex-row justify-end border-b border-[var(--border-color)] bg-[var(--color-base-10)]"
>
	<button on:click={() => appWindow.minimize()} aria-label="minimize">
		<MinusIcon size="14" />
	</button>
	<button on:click={() => appWindow.toggleMaximize()} aria-label="maximize">
		<SquareIcon size="13" />
	</button>
	<button class="hover:!bg-red-500" on:click={() => appWindow.close()} aria-label="close">
		<XIcon size="14" />
	</button>
</div>

<style lang="postcss">
	button {
		@apply p-2 transition-colors duration-75 hover:bg-[var(--color-base-30)];
	}
</style>
