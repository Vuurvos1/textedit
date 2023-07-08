<script lang="ts">
	import { note } from '$lib/stores';
	import type EasyMDE from 'easymde';
	import NoteBody from './NoteBody.svelte';
	import NoteHeader from './NoteHeader.svelte';

	let easymde: EasyMDE;
</script>

<div class="note flex h-full max-h-full w-full flex-col overflow-y-hidden bg-gray-100">
	{#if $note !== undefined}
		<NoteHeader {easymde} />

		<NoteBody {easymde} />
	{/if}
</div>

<style lang="postcss">
</style>
