<script>
	import { createPopperActions } from 'svelte-popperjs';

	import { MoreHorizontal } from '$lib/icons';
	// TODO: add some id thing so that only 1 can be open at a time

	const [popperRef, popperContent] = createPopperActions({
		placement: 'bottom',
		strategy: 'fixed'
	});
	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	let showTooltip = false;
</script>

<div class="relative leading-[0]">
	<slot name="icon">
		<button
			use:popperRef
			on:click={() => {
				showTooltip = !showTooltip;
			}}
		>
			<MoreHorizontal />
		</button>
	</slot>

	{#if showTooltip}
		<div
			class="z-10 leading-normal"
			use:popperContent={extraOpts}
			on:click={() => {
				// TODO: add outside click
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

<style>
	/* button {
		line-height: 0;
	} */
</style>
