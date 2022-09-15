<script>
	import { supabase, user } from './supabase';

	let loading = false;
	async function handleLogin() {
		try {
			loading = true;
			const { user, session, error } = await supabase.auth.signIn({
				provider: 'github'
			});
			console.log(error, user, session);
			if (error) throw error;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

	async function updateRow() {
		console.log(
			await supabase.from('test').insert({
				user_id: $user?.id,
				transform: new Array(16).fill(0),
				random: Math.random()
			})
		);
	}
</script>

{#if !$user}
	<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
			on:click={handleLogin}>Login</button
		>
	</div>
{:else}
	<button on:click={updateRow}>Test</button>
{/if}
