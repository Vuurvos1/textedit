<script lang="ts">
  import Folder from '$lib/Folder.svelte';
  import { open } from '@tauri-apps/api/dialog';
  import { readDir, type FileEntry } from '@tauri-apps/api/fs';
  import {
    ArrowUpNarrowWideIcon,
    ChevronsDownUpIcon,
    FileSearchIcon,
    FolderPlusIcon,
    LogInIcon,
    PenSquareIcon,
    SettingsIcon,
    TerminalIcon,
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import IconButton from '$lib/IconButton.svelte';

  let loading = false;
  let fileTree: FileEntry[] = [];
  let filePath = '';

  // TODO: move file tree stuff to a store

  async function openFolder(directory?: string) {
    loading = true;

    if (!directory) {
      const openRes = await open({ directory: true, multiple: false });
      directory = Array.isArray(openRes) ? openRes[0] : openRes;
    }

    localStorage.setItem('filePath', directory);

    console.info('loading files', directory);

    const files = await readDir(directory, { recursive: true });
    fileTree = files;

    console.log(fileTree);

    loading = false;
  }

  onMount(() => {
    const path = localStorage.getItem('filePath');
    if (path) {
      filePath = path;
    }

    console.log(filePath, path);

    if (filePath) {
      openFolder(filePath);
    }
  });
</script>

<div class="flex flex-row h-full">
  <div class="border-r flex flex-col gap-1 px-2 py-3">
    <IconButton name="Search">
      <FileSearchIcon size="20" />
    </IconButton>

    <IconButton name="Command pallete">
      <TerminalIcon size="20" />
    </IconButton>

    <div class="mt-auto"></div>

    <IconButton on:click={() => openFolder()} name="Open vault">
      <LogInIcon size="20" />
    </IconButton>

    <button class="hover:bg-gray-200 rounded px-1 py-1">
      <span class="sr-only">Settings</span>
      <SettingsIcon size="20" />
    </button>
  </div>

  <div class="py-2 border-r flex flex-col overflow-hidden">
    <div class="flex flex-row gap-1 justify-center w-full px-3 mb-3">
      <IconButton name="New note">
        <PenSquareIcon size="20" />
      </IconButton>

      <IconButton name="New folder">
        <FolderPlusIcon size="20" />
      </IconButton>

      <IconButton name="Change sort order">
        <!-- TODO: change icon based on search order -->
        <ArrowUpNarrowWideIcon size="20" />
      </IconButton>

      <IconButton name="Collapse all">
        <ChevronsDownUpIcon size="20" />
      </IconButton>
    </div>

    <div class="overflow-y-auto overflow-x-hidden px-3 scrollbar-stable">
      <!-- notes -->
      <Folder name="Home" files={fileTree} expanded />
    </div>
  </div>
</div>

<style>
</style>
