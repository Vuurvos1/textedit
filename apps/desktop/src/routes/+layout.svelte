<script>
	import { handleKeyboardShortcuts } from '$lib/shortcuts';
	import '../app.css';

	import { onMount } from 'svelte';

	onMount(() => {
		window.addEventListener('keydown', handleKeyboardShortcuts);

		return () => {
			window.removeEventListener('keydown', handleKeyboardShortcuts);
		};
	});
</script>

<slot />
