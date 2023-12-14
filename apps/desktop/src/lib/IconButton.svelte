<script lang="ts">
  export let name: string;
</script>

<button
  on:click
  class="hover:bg-gray-200 rounded px-1.5 py-1 transition"
  type="button"
>
  <span class="sr-only">{name}</span>
  <slot />
</button>
