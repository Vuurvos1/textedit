import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').LayoutLoad} */
export const load = async (event) => {
	const { session } = await getSupabase(event);
	return { session };
};
