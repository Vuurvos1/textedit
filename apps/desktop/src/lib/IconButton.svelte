<script lang="ts">
	export let name: string;
</script>

<button
	on:click
	class="inline-flex items-center justify-center rounded px-1.5 py-1 transition hover:bg-gray-200"
	type="button"
>
	<span class="sr-only">{name}</span>
	<slot />
</button>
