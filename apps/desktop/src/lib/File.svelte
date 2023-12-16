<script lang="ts">
	export let name: string;
	$: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<!-- TODO add file icons / tags -->
<button class="mb-1 w-full truncate rounded px-4 py-1 pl-4 text-left text-sm hover:bg-gray-300/50">
	<span class="">{name.slice(0, name.lastIndexOf('.'))}</span>
	<!-- <span>{type}</span> -->
</button>

<style>
</style>
