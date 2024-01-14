<script lang="ts">
	import { computePosition, shift, flip, offset } from '@floating-ui/dom';
	import { tick, onMount } from 'svelte';
	import { clickOutside } from '$lib/actions';

	// | { type: 'divider' }
	type MenuItem = {
		type?: 'item' | 'divider';
		label?: string;
		icon?: string;
		action?: () => void;
		items?: MenuItem[];
	};

	export let show = false;

	export let menuItems: MenuItem[] = [
		{
			label: 'Item 1'
		},
		{
			label: 'Item 2',
			items: [
				{
					label: 'Item 2.1'
				},
				{
					label: 'Item 2.2'
				}
			]
		},
		{
			type: 'divider'
		},
		{
			label: 'Item 3'
		},
		{
			label: 'Item 4',
			action: () => {
				console.log('item 4');
			}
		}
	];

	export let reference: HTMLElement;
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
			middleware: [offset(5), flip(), shift()]
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

	async function handleContextMenu(ev: MouseEvent) {
		console.log('context click');
		if (reference) {
			return;
		}

		ev.preventDefault();
		show = true;
		await tick();
		console.log('context menu');

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
			middleware: [offset(5), flip(), shift()]
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

	onMount(() => {
		console.log('mounted');
	});
</script>

{#if show}
	<nav
		bind:this={floating}
		use:clickOutside={() => {
			show = false;
		}}
		class="fixed left-0 top-0 z-50 rounded bg-gray-500 p-3"
	>
		<ul>
			{#each menuItems as item, i}
				{#if item.type === 'divider'}
					<li class="my-2 border-b"></li>
				{:else if item.items}
					<li bind:this={children[i]}>
						<button
							on:click={() => {
								// open child menu
								item.action?.();
								childrenOpen[i] = true;

								console.log(childrenOpen);
							}}
						>
							<!-- {#if item.action}
      <button on:click={item.action}>

        <button>
      {:else}
      {/if}
      </a> -->

							{#if item.items}
								<svelte:self
									show={childrenOpen[i] ?? false}
									menuItems={item.items}
									reference={children[i]}
								/>
							{/if}

							{#if item.icon}
								<!-- TODO -->
								<!-- <i class="material-icons">{item.icon}</i> -->
							{/if}

							{item.label}
						</button>
					</li>
				{:else}
					<li bind:this={children[i]}>
						<button
							on:click={() => {
								item.action?.();
							}}
						>
							{#if item.icon}
								<!-- TODO -->
								<!-- <i class="material-icons">{item.icon}</i> -->
							{/if}

							{item.label}
						</button>
					</li>
				{/if}
				<!-- content here -->
			{/each}
		</ul>
	</nav>
{/if}
