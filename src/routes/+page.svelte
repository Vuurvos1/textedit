<script>
	import { supabase, user } from '$lib/supabase';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('state change', event);
		user.set(session.user);
	});
</script>

<h1>Welcome to Text Edit</h1>

<p>An app for taking notes</p>

<a href="/notes">Goto notes</a>

<style>
	h1 {
		font-family: sans-serif;
	}
</style>
