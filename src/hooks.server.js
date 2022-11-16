import '$lib/db';
// import { supabase } from '$lib/supabase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	return await resolve(event);
}
