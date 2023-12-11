<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri';
  import { open } from '@tauri-apps/api/dialog';

  let name = '';
  let greetMsg = '';

  let markdownFiles: string[] = [];

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke('greet', { name });
  }

  async function getListOfMarkdownFiles() {
    try {
      const markdownFiles = await invoke('list_markdown_files');
      console.log('Markdown Files:', markdownFiles);
    } catch (error) {
      console.error('Error listing Markdown files:', error);
    }
  }

  async function selectFolder() {
    try {
      const result = await open({
        directory: true,
        multiple: false,
        title: 'Select a folder to search in',
      });

      if (result) {
        const selectedFolder = result[0];
        console.log('Selected folder:', selectedFolder, result);

        const folder = Array.isArray(result) ? result[0] : result;

        // Now you can send the selected folder path to the Rust side.
        const res = (await invoke('search_markdown_files', {
          selectedFolder: folder,
        })) as string[];
        console.log('Markdown Files:', res);

        markdownFiles = res;
      }
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  }
</script>

<div>
  <form class="row" on:submit|preventDefault={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
  </form>
  <p>{greetMsg}</p>

  <!-- <button on:click={selectFolder}> Get file tree </button> -->

  <!-- <h2>Markdown files:</h2>
  <ul>
    {#each markdownFiles as file}
      <li>{file}</li>
    {/each}
  </ul> -->
</div>
