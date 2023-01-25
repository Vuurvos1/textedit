<script lang="ts">
	import { note } from '$lib/stores';
	import type EasyMDE from 'easymde';
	import NoteBody from './NoteBody.svelte';
	import NoteHeader from './NoteHeader.svelte';

	let easymde: EasyMDE;
</script>

<div class="h-full max-h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note">
	{#if $note !== undefined}
		<NoteHeader {easymde} />

		<NoteBody {easymde} />
	{/if}
</div>

<style lang="scss">
</style>
