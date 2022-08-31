// import { supabase } from '$lib/supabase';

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { createClient } from '@supabase/supabase-js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ setHeaders, request }) {
	const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
	const SUPABASE_URL = process.env.VITE_SUPABASE_URL;

	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

	const formdata = await request.formData();

	const email = String(formdata.get('email'));
	const password = String(formdata.get('password'));

	console.log(supabase);

	console.log(email, password);
	const { user, session, error } = await supabase.auth.signUp({ email: email, password: password });
	console.log(user, session, error);

	if (error) {
		return new Response(error.message, { status: error.status });
	}

	setHeaders({
		'set-cookie': `session=${JSON.stringify(
			session
		)}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
			session.expires_at * 1000
		).toUTCString()};`
	});

	return new Response('succes', {
		status: 200
	});
}
