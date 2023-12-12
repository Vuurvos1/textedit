<script lang="ts">
  import Greet from '$lib/Greet.svelte';
  import Folder from '$lib/Folder.svelte';

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

  let loading = false;
  let fileTree: FileEntry[] = [];

  async function openFolder() {
    loading = true;

    const openRes = await open({ directory: true, multiple: false });
    const directory = Array.isArray(openRes) ? openRes[0] : openRes;

    const files = await readDir(directory, { recursive: true });
    fileTree = files;
    // console.log(fileTree);

    loading = false;
  }
</script>

<main class="container">
  <p class="text-center bg-pink-400">
    Click on the Tauri, Vite, and Svelte logos to learn more.
  </p>

  <div class="row">
    <Greet />
  </div>

  <button class="mb-4" on:click={openFolder}>Open Folder</button>

  <div class="">
    <Folder name="Home" files={fileTree} expanded />
  </div>
</main>

<style lang="postcss">
</style>
