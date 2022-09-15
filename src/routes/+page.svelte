<script>
	import { supabase, user } from '$lib/supabase';
	// import { page } from '$app/stores';
	// import { onMount } from 'svelte';
	// import { goto, invalidate } from '$app/navigation';
	// import { supabase, signIn, signOut } from '$lib/supabaseClient';
	// import { handleSession } from '$lib/session';

	// export let data;
	// export let response;

	// supabase.auth.onAuthStateChange(async (event, session) => {
	// 	//console.log(event)
	// 	// if (event !== 'TOKEN_REFRESHED') {
	// 	// 	response = await handleSession(event, session);
	// 	// }
	// 	// if (response) {
	// 	// 	await invalidate();
	// 	// 	goto(response.url);
	// 	// }
	// });

	// async function postData(ev) {
	// 	// const { data, error } = await supabase.from('posts').upsert({
	// 	// id: data.id,
	// 	// title,
	// 	// content,
	// 	// // metadata: {},
	// 	// user_id: _session.user.id
	// 	// });
	// }

	// export const signIn = async (provider) => {
	// 	try {
	// 		/*
	// 		 ** if logging in on a page other than `/`:
	// 		 ** to prevent a flash of content after login,
	// 		 ** set redirectTo equal to your app's login page
	// 		 */
	// 		// { redirectTo: 'http://localhost:5173/login' }
	// 		const { user, session, error } = await supabase.auth.signIn({ provider });
	// 		if (error) console.error(error);

	// 		console.log(user, session, await supabase.auth.user());
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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

	// function checkUser() {
	// 	console.log('checking user');
	// 	$user = supabase.auth.user();
	// }

	// onMount(() => {
	// 	window.addEventListener('hashchange', () => {
	// 		checkUser();
	// 	});
	// });

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('state change', event);
		user.set(session.user);
	});
</script>

<h1>Welcome to textedit</h1>

<!-- <textarea name="yee" id="" cols="30" rows="10" />
<button on:click={postData}>Post data</button> -->

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
