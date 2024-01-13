<script lang="ts">
	import { portal, clickOutside, createFocusTrap } from '$lib/actions';

	export let target = '.app';
	export let open = false;

	const { useFocusTrap } = createFocusTrap({ immediate: true });
</script>

<!-- TODO: turn into an action if possible -->
<svelte:window
	on:keydown={(ev) => {
		if (!open) return;

		if (ev.key === 'Escape') {
			open = false;
		}
	}}
/>

{#if open}
	<div class="fixed inset-0 z-50" use:portal={target} use:useFocusTrap>
		<div tabindex="-1" aria-hidden="true" class="fixed inset-0 bg-gray-900/10" />

		<div
			use:clickOutside={() => {
				open = false;
			}}
			class="relative top-16 z-20 mx-auto max-h-[70vh] max-w-[80vw] overflow-hidden rounded-lg border border-gray-200 bg-[var(--background-primary)]"
		>
			<slot />
		</div>
	</div>
{/if}
