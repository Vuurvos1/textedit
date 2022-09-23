<script>
	import Tags from './Tags.svelte';
	import { showNavigation, showNotes, showEditor } from '$lib/stores';

	/** @type {import('./tags').Tag[]} */
	export let tags;
</script>

<!-- change to asside? -->
<!-- navigation -->
<div class="h-full py-4">
	<h3 class="font-bold font-lg px-4">Views</h3>

	<ul class="px-4">
		<li>
			<button>Notes</button>
		</li>
		<li>
			<button>Untaged</button>
		</li>
		<li>
			<button>Archived</button>
		</li>
		<li>
			<button>Deleted</button>
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
</style>
