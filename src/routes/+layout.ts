// export const prerender = true;

// import type { LayoutLoad } from './$types';
// import { getSupabase } from '@supabase/auth-helpers-sveltekit';

// export const load: LayoutLoad = async (event) => {
// 	const { session } = await getSupabase(event);
// 	return { session };
// };

// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
// import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
// import type { LayoutLoad } from './$types';
// import type { Database } from '../DatabaseDefinitions';

// export const load: LayoutLoad = async ({ fetch, data, depends }) => {
// 	depends('supabase:auth');

// 	const supabase = createSupabaseLoadClient<Database>({
// 		supabaseUrl: PUBLIC_SUPABASE_URL,
// 		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
// 		event: { fetch },
// 		serverSession: data.session
// 	});

// 	const {
// 		data: { session }
// 	} = await supabase.auth.getSession();

// 	return { supabase, session };
// };
