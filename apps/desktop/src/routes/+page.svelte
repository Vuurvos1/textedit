<script lang="ts">
  import Greet from '$lib/Greet.svelte';
  import Sidebar from '$lib/Sidebar.svelte';
</script>

<div class="flex flex-row h-full">
  <Sidebar></Sidebar>

  <main>
    <div>
      <Greet />
    </div>

    <div></div>
  </main>
</div>

<style lang="postcss">
</style>
