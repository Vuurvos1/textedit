import { supabase } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function POST({ setHeaders }) {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return new Response(error.message, { status: error.status });
	}

	setHeaders({
		location: '/',
		'set-cookie': `session=; path=/; expires=0;`
	});

	return new Response('success', { status: 200 });
}
