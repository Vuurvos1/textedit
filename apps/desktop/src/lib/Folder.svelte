<script lang="ts">
  import File from './File.svelte';
  import { FolderIcon, FolderOpenIcon } from 'lucide-svelte';
  import type { FileEntry } from '@tauri-apps/api/fs';

  export let expanded = false;
  export let name;
  export let files: FileEntry[] = [];

  function toggle() {
    expanded = !expanded;
  }
</script>

<!-- TODO: make folder/file hovers always full width -->
<button
  class="hover:bg-gray-300 flex flex-row items-center gap-2 px-4 py-1"
  on:click={toggle}
>
  {#if expanded}
    <FolderOpenIcon />
  {:else}
    <FolderIcon />
  {/if}
  <span class="truncate">
    {name}
  </span>
</button>

{#if expanded}
  <ul class="border-l border-gray-500/40 ml-6 pl-2">
    {#each files as file}
      <li class="">
        {#if file.children}
          <svelte:self name={file.name} files={file.children} {...file} />
        {:else}
          <File name={file.name} {...file} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
</style>
