<script lang="ts">
	import { createPopperActions } from 'svelte-popperjs';
	import { clickOutside } from '$lib/clickOutside';
	import { MoreHorizontal } from '$lib/icons';

	// /** @type {import('svelte-popperjs').ReferenceAction} */
	// TODO: add some id thing so that only 1 can be open at a time

	// TODO: add placement type to this
	export let placement = 'bottom';

	const [popperRef, popperContent] = createPopperActions({
		placement: placement
	});
	export let extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	let showTooltip = false;
</script>

<div class="relative leading-[0]">
	<button
		use:popperRef
		on:keydown={(ev) => {
			if (ev.key === ' ' || ev.key === 'Enter') {
				showTooltip = !showTooltip;
			}
		}}
		on:click|stopPropagation={() => {
			showTooltip = !showTooltip;
		}}
	>
		<slot name="icon">
			<MoreHorizontal />
		</slot>
	</button>

	{#if showTooltip}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="z-10 rounded bg-[var(--background-primary)] leading-normal shadow"
			use:popperContent={extraOpts}
			use:clickOutside
			on:outclick={() => {
				showTooltip = false;
			}}
			on:click={() => {
				showTooltip = false;
			}}
			on:keydown={(ev) => {
				// TODO: add propper keyboard support
				console.info(ev.key);
			}}
		>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
