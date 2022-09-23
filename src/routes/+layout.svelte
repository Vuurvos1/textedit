<script>
	import '../app.scss';

	// import { goto, invalidate } from '$app/navigation';
	// import { session } from '$lib/stores';
	// import { supabase } from '$lib/supabase';

	// export let data;
	// export let response;

	// $: user = data.user;

	// user.set(supabase.auth.user());

	// supabase.auth.onAuthStateChange(async (event, session) => {
	// 	console.log('auth change', event, session);

	// 	const res = await handleSession(event, session);
	// 	console.log('res', res);

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
</script>

<slot />

<style lang="scss">
</style>
