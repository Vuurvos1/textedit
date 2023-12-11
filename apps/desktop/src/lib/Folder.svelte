<script lang="ts">
  import File from './File.svelte';
  import type { FileEntry } from '@tauri-apps/api/fs';

  export let expanded = false;
  export let name;
  export let files: FileEntry[] = [];

  function toggle() {
    expanded = !expanded;
  }
</script>

<button class:expanded on:click={toggle}>
  {#if expanded}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-folder-open"
    >
      <path
        d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-folder"
    >
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  {/if}
  {name}
</button>

{#if expanded}
  <ul>
    {#each files as file}
      <li>
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
  button {
    padding: 0.25rem 1rem;
    /* padding: 0 0 0 1.5em; */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    /* background: url(/tutorial/icons/folder.svg) 0 0.1em no-repeat; */
    /* background-size: 1em 1em; */
    color: var(--fg-1);
    font-weight: bold;
    cursor: pointer;
    border: none;
    margin: 0;
  }

  .expanded {
    background-image: url(/tutorial/icons/folder-open.svg);
  }

  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
    border-left: 1px solid rgba(128, 128, 128, 0.4);
  }

  li {
    padding: 0.2em 0;
  }
</style>
