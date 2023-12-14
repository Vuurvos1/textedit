<script lang="ts">
  export let name: string;
  $: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<!-- TODO add file icons / tags -->
<button class="truncate pl-4 hover:bg-gray-300 py-1 px-4 mb-1">
  <span class=" ">{name.slice(0, name.lastIndexOf('.'))}</span>
  <!-- <span>{type}</span> -->
</button>

<style>
</style>
