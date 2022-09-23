<script>
	import { supabase, user } from '$lib/supabase';

	// Github auth attempt
	// async function signin() {
	// 	// await fetch('/api/auth/signin', {
	// 	// 	method: 'POST',
	// 	// 	body: JSON.stringify({ provider: 'github' })
	// 	// });
	// 	const data = await supabase.auth.signIn({
	// 		provider: 'github'
	// 	});

	// 	console.log(data);
	// }

	// async function out() {
	// 	// await fetch('/api/auth/signout', { method: 'POST' });
	// 	const { error } = await supabase.auth.signOut();
	// 	console.log(error);
	// 	$user = null;
	// }

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('state change', event);
		user.set(session.user);
	});
</script>

<h1>Welcome to textedit</h1>

<a href="/notes">Goto notes</a>

<!-- 
{#if user}
	<img src="" alt="" />
	<button
		on:click={() => {
			signOut();
		}}
	>
		Logout
	</button>
{:else}
	<button
		on:click={() => {
			signIn('github');
		}}
	>
		GH login
	</button>
{/if}
-->
<style>
	h1 {
		font-family: sans-serif;
	}
</style>
