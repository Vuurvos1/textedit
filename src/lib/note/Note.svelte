<script>
	import NoteBody from './NoteBody.svelte';
	import NoteHeader from './NoteHeader.svelte';

	/** @type {import('easymde')} */
	let easymde;
</script>

<div class="h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note">
	<NoteHeader {easymde} />

	<NoteBody {easymde} />
</div>

<style lang="scss">
	button {
		white-space: nowrap;
	}

	// .note {
	// :global() TODO import editor styles here
	// }

	@media (min-width: 768px) {
		.back-button {
			display: none;
		}
	}
</style>
