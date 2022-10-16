<script>
	import { createPopperActions } from 'svelte-popperjs';
	import { clickOutside } from '$lib/clickOutside';
	import { MoreHorizontal } from '$lib/icons';

	// TODO: add some id thing so that only 1 can be open at a time

	// export const options = {}
	export const placement = 'bottom';

	const [popperRef, popperContent] = createPopperActions({
		placement: placement
	});
	export const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	let showTooltip = false;
</script>

<div class="relative leading-[0]">
	<button
		use:popperRef
		on:click|stopPropagation={() => {
			showTooltip = !showTooltip;
		}}
	>
		<slot name="icon">
			<MoreHorizontal />
		</slot>
	</button>

	{#if showTooltip}
		<div
			class="z-10 leading-normal bg-slate-50 shadow rounded"
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
				console.log(ev.key);
			}}
		>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
</style>
