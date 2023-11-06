<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { user } from '$lib/stores';

	// export let data: LayoutData;

	// $: ({ supabase, session } = data);

	onMount(() => {
		// const {
		// 	data: { subscription }
		// } = supabase.auth.onAuthStateChange((event, _session) => {
		// 	$user = _session?.user;
		// 	if (_session?.expires_at !== session?.expires_at) {
		// 		invalidate('supabase:auth');
		// 	}
		// });
		// return () => subscription.unsubscribe();
	});
</script>

<slot />

<style lang="postcss">
</style>
