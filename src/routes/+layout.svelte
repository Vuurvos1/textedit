<script>
	import '../app.scss';

	// import { goto, invalidate } from '$app/navigation';

	// export let data;
	// export let response;

	// $: user = data.user;

	// user.set(supabase.auth.user());

	// supabase.auth.onAuthStateChange(async (event, session) => {
	// 	console.log('auth change', event, session);

	// 	const res = await handleSession(event, session);
	// 	console.log('res', res);

	// 	if (event == 'SIGNED_IN') {
	// 		userStore.set(session?.user);
	// 	} else if (event == 'SIGNED_OUT') {
	// 		userStore.set(null);
	// 	}
	// });

	// supabase.auth.onAuthStateChange(async (event, session) => {
	// 	console.log('auth change', event, session);

	// 	// user.set(session?.user);
	// 	// if (session?.user) {
	// 	// 	// get db data
	// 	// }

	// 	//console.log(event)
	// 	if (event !== 'TOKEN_REFRESHED') {
	// 		response = await handleSession(event, session);
	// 	}

	// 	if (response) {
	// 		await invalidate();
	// 		goto(response.url);
	// 	}
	// });

	// import { session } from '$lib/stores';
	// import { supabase } from '$lib/supabase';
</script>

<!-- <nav>
	<a href="/login">sign in</a>
	<a href="/login">sign up</a>
	<a href="/login">sign out</a>
</nav> -->

<slot />

<!-- 
<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
	<a href="/">Home</a>
	<!-- {#if user} -->
<!-- <a href="/app">App</a> -->
<!-- <img
		style="width: 32px; height: 32px; border-radius: 9999px;"
		src={user.avatar_url}
		alt="person_avatar"
	/> -->

<!-- {:else} -->
<!-- <a href="/login">Login</a> -->
<!-- {/if} -->

<!-- </nav> -->
<style lang="scss">
</style>
