<script>
	import Tags from './Tags.svelte';
	import { showNavigation, showNotes, showEditor } from '$lib/stores';
	import { FileText, Hash, Trash, Inbox } from '$lib/icons';

	// /** @type {import('./tags').Tag[]} */
	// export let tags;
</script>

<!-- change to asside? -->
<!-- navigation -->
<div class="h-full py-4">
	<h3 class="font-bold font-lg px-4 mb-2">Views</h3>

	<ul class="flex flex-col">
		<li>
			<button class="w-full px-4 py-1 hover:bg-slate-400">
				<FileText />
				<span>Notes</span>
			</button>
		</li>
		<li>
			<button class="w-full px-4 py-1 hover:bg-slate-400">
				<Hash />
				<span>Untaged</span>
			</button>
		</li>
		<li>
			<button class="w-full px-4 py-1 hover:bg-slate-400">
				<Inbox />
				<span>Archived</span>
			</button>
		</li>
		<li>
			<button class="w-full px-4 py-1 hover:bg-slate-400">
				<Trash />
				<span>Deleted</span>
			</button>
		</li>
	</ul>

	<Tags />

	<div class="md:hidden">
		<button
			on:click={() => {
				$showNotes = true;
				$showNavigation = false;
				$showEditor = false;
			}}>&#60; Back</button
		>
		<!-- profile -->
		<!-- settings -->
		<!-- theme -->
	</div>
</div>

<style lang="scss">
	ul {
		margin-bottom: 1.25rem;
	}

	li {
		margin-bottom: 0.25rem;

		button {
			display: flex;
			flex-direction: row;
		}

		span {
			margin-left: 0.5rem;
		}
	}
</style>
