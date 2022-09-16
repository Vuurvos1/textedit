<script>
	import Tags from './Tags.svelte';

	/** @type {import('./types').Tag[]} */
	export let tags;
</script>

<div class="bg-slate-300 h-full py-4">
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
</div>

<style lang="scss"></style>
