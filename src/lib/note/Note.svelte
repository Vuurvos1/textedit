<script lang="ts">
	import { note } from '$lib/stores';
	import NoteHeader from './NoteHeader.svelte';
	import Editor from '$lib/Editor.svelte';
</script>

<div class="note flex h-full max-h-full w-full flex-col overflow-y-hidden bg-gray-100">
	{#if $note !== undefined}
		<NoteHeader />

		<Editor />
	{/if}
</div>

<style lang="postcss">
</style>
