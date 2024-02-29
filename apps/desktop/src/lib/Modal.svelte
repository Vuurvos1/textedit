<script lang="ts">
	import { portal, clickOutside, createFocusTrap, escapeKeydown } from '$lib/actions';

	export let target = '.app';
	export let open = false;

	const { useFocusTrap } = createFocusTrap({ immediate: true });
</script>

{#if open}
	<div
		class="fixed inset-0 z-50"
		use:portal={target}
		use:useFocusTrap
		use:escapeKeydown={() => {
			open = false;
		}}
	>
		<div tabindex="-1" aria-hidden="true" class="Z-10 fixed inset-0 bg-gray-900/25" />

		<div
			use:clickOutside={() => {
				open = false;
			}}
			class="bg-bg-primary-alt relative top-16 z-20 mx-auto max-h-[70vh] max-w-[80vw] overflow-hidden rounded-lg border"
		>
			<slot />
		</div>
	</div>
{/if}
