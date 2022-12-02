<script lang="ts">
	import type EasyMDE from 'easymde';
	import NoteBody from './NoteBody.svelte';
	import NoteHeader from './NoteHeader.svelte';

	let easymde: EasyMDE;
</script>

<div class="h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note">
	<NoteHeader {easymde} />

	<NoteBody {easymde} />
</div>

<style lang="scss">
</style>
