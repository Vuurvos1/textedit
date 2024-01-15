<script lang="ts">
	import { tooltip } from '$lib/actions';

	export let name: string;
</script>

<button
	on:click
	use:tooltip={{ text: name }}
	class="hover:bg-hover-icon inline-flex items-center justify-center rounded px-1.5 py-1 transition"
	type="button"
>
	<span class="sr-only">{name}</span>
	<slot />
</button>
