<script lang="ts">
  import Greet from './lib/Greet.svelte';

  import {
    readDir,
    createDir,
    writeFile,
    removeDir,
    removeFile,
    renameFile,
    type FileEntry,
  } from '@tauri-apps/api/fs';
  import {
    resolve as pathResolve,
    join as pathJoin,
    basename as pathBasename,
    sep as DS,
  } from '@tauri-apps/api/path';
  import { open } from '@tauri-apps/api/dialog';
  import Folder from './lib/Folder.svelte';

  let loading = false;
  let fileTree: FileEntry[] = [];

  async function openFolder() {
    loading = true;

    const openRes = await open({ directory: true, multiple: false });
    const directory = Array.isArray(openRes) ? openRes[0] : openRes;

    const files = await readDir(directory, { recursive: true });
    fileTree = files;
    console.log(fileTree);

    loading = false;
  }
</script>

<main class="container">
  <h1>Welcome to Tauri!</h1>

  <div class="row">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>

  <p class="text-center">
    Click on the Tauri, Vite, and Svelte logos to learn more.
  </p>

  <div class="row">
    <Greet />
  </div>

  <button on:click={openFolder}>Open Folder</button>

  <div class="">
    <Folder name="Home" files={fileTree} expanded />
  </div>
</main>

<style>
  .text-center {
    text-align: center;
  }

  button {
    margin-bottom: 1rem;
  }

  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
</style>
