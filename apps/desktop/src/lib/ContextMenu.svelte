<script lang="ts" context="module">
	let opened: () => void;

	function closeAll() {
		if (opened) {
			opened();
		}
	}
</script>

<script lang="ts">
	import { computePosition, shift, flip, offset } from '@floating-ui/dom';
	import { tick } from 'svelte';
	import { clickOutside, portal } from '$lib/actions';
	import { ChevronRight } from 'lucide-svelte';

	import { createElement, icons } from 'lucide';

	// | { type: 'divider' }
	type MenuItem = {
		type?: 'item' | 'divider';
		label?: string;
		icon?: keyof typeof icons;
		action?: () => void;
		items?: MenuItem[];
	};

	export let show = false;

	export let menuItems: MenuItem[] = [
		{
			label: 'Item 1 that is longer',
			icon: 'Delete'
		},
		{
			label: 'Item 2',
			icon: 'Delete',
			items: [
				{
					label: 'Item 2.1'
				},
				{
					label: 'Item 2.2',
					icon: 'Bug'
				}
			]
		},
		{
			type: 'divider'
		},
		{
			label: 'Item 3',
			icon: 'Edit2'
		},
		{
			label: 'Item 4',
			action: () => {
				console.log('item 4');
			}
		}
	];

	export let reference: HTMLElement = null;
	export let target: HTMLElement;

	let floating: HTMLElement;

	$: {
		if (reference && show) {
			updatePos();
		}
	}

	async function updatePos() {
		await tick();
		computePosition(reference, floating, {
			placement: 'right-start',
			strategy: 'fixed',
			middleware: [offset(8), flip(), shift()]
		}).then(({ x, y }) => {
			Object.assign(floating.style, {
				top: `${y}px`,
				left: `${x}px`
			});
		});
	}

	// maybe make turn into an object hashtable since not every item will have a child
	const children = [];
	const childrenOpen = [];

	function hide() {
		show = false;
	}

	$: {
		if (!reference) {
			show = false;
		}
	}

	async function handleContextMenu(ev: MouseEvent) {
		show = false;
		await tick();

		if (reference) {
			return;
		}

		closeAll();
		opened = hide;

		ev.preventDefault();
		show = true;
		await tick();

		const { clientX, clientY } = ev;

		const virtualEl = {
			getBoundingClientRect() {
				return {
					width: 0,
					height: 0,
					x: clientX,
					y: clientY,
					left: clientX,
					right: clientX,
					top: clientY,
					bottom: clientY
				};
			}
		};

		await computePosition(virtualEl, floating, {
			placement: 'right-start',
			strategy: 'fixed',
			middleware: [offset(8), flip(), shift()]
		}).then(({ x, y }) => {
			Object.assign(floating.style, {
				top: `${y}px`,
				left: `${x}px`
			});
		});
	}

	$: {
		if (target) {
			target.addEventListener('contextmenu', handleContextMenu);
		}
	}
</script>

<!-- TODO: further cleanup logic -->
{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<nav
		on:click|stopPropagation
		bind:this={floating}
		use:portal={'.app'}
		use:clickOutside={() => {
			show = false;
		}}
		class="bg-bg-primary-alt fixed left-0 top-0 z-50 rounded-md border px-1 py-2"
	>
		<ul>
			{#each menuItems as item, i}
				{#if item.type === 'divider'}
					<li class="-mx-1 my-2 border-b"></li>
				{:else}
					<li bind:this={children[i]}>
						<button
							class="hover:bg-hover my-1 flex w-full flex-row items-center gap-2 rounded px-3 py-1 text-left text-sm"
							on:click={() => {
								// open child menu
								item.action?.();

								// TODO: maybe also do this on hover, like the tooltip
								if (item.items) childrenOpen[i] = true;
							}}
						>
							{#if item.icon}
								{@html createElement(icons[item.icon]).outerHTML}
								<!-- TODO -->
								<!-- <i class="material-icons">{item.icon}</i> -->
							{/if}

							<span>
								{item.label}
							</span>

							{#if item.items}
								<ChevronRight class="ml-auto" />

								<svelte:self
									show={childrenOpen[i] ?? false}
									menuItems={item.items}
									reference={children[i]}
								/>
							{/if}
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
{/if}

<style lang="postcss">
	button :global(svg) {
		@apply h-4 w-4;
	}
</style>
