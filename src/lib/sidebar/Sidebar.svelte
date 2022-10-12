<script>
	import Tags from './Tags.svelte';
	import { showNavigation, showNotes, showEditor } from '$lib/stores';
	import { FileText, Hash, Trash } from '$lib/icons';

	/** @type {import('./tags').Tag[]} */
	export let tags;
</script>

<!-- change to asside? -->
<!-- navigation -->
<div class="h-full py-4">
	<h3 class="font-bold font-lg px-4">Views</h3>

	<ul class="px-4">
		<li>
			<button>
				<FileText />
				<span>Notes</span>
			</button>
		</li>
		<li>
			<button>
				<Hash />
				<span>Untaged</span>
			</button>
		</li>
		<li>
			<!-- <Archive /> -->
			<button>Archived</button>
		</li>
		<li>
			<button>
				<Trash />
				<span>Deleted</span>
			</button>
		</li>
	</ul>

	<Tags {tags} />

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
