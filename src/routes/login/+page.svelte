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

		// if (response.ok) {
		// 	window.location = '/dashboard';
		// } else {
		// 	console.error(await response.text());
		// }
	}

	async function signin() {}
</script>

<h1>Login</h1>

<section>
	<h2>sign up</h2>

	<form action="" on:submit|preventDefault={signup}>
		<label for="email">email</label>
		<input bind:value={email} name="email" id="email" type="email" />
		<label for="pass">password</label>
		<input bind:value={password} name="password" id="pass" type="password" />

		<button type="submit">Submit</button>
	</form>
</section>

<section>
	<h2>sign in</h2>
	<label for="email2">email</label>
	<input bind:value={email} name="email" id="email2" type="email" />
	<label for="pass2">password</label>
	<input bind:value={password} name="password" id="pass2" type="password" />

	<button type="submit">Submit</button>
</section>
