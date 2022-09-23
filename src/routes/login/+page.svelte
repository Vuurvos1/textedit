<script>
	import { supabase } from '$lib/supabase';

	let email = '';
	let password = '';

	async function signup(ev) {
		// const { session, error } = await supabase.auth.signUp({ email, password });
		// console.log(session, error);

		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			body: new FormData(ev.target)
		});

		console.log(await response.text());
	}
</script>

<h1>Login</h1>
