import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
// import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
// import Google from '@auth/core/providers/google';
// import { sequence } from '@sveltejs/kit/hooks';

// import type { Handle } from '@sveltejs/kit';

// function supabase({ event, resolve }) {
// 	event.locals.supabase = createSupabaseServerClient({
// 		supabaseUrl: PUBLIC_SUPABASE_URL,
// 		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
// 		event
// 	});

// 	/**
// 	 * a little helper that is written for convenience so that instead
// 	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
// 	 * you just call this `await getSession()`
// 	 */
// 	event.locals.getSession = async () => {
// 		const {
// 			data: { session }
// 		} = await event.locals.supabase.auth.getSession();
// 		return session;
// 	};

// 	return resolve(event, {
// 		filterSerializedResponseHeaders(name) {
// 			return name === 'content-range';
// 		}
// 	});
// }

// supabase,

export const hanle = SvelteKitAuth({
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});

// export const handle = sequence(
// 	SvelteKitAuth({
// 		providers: [
// 			GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })
// 			// Google({
// 			// 	clientId: GOOGLE_ID,
// 			// 	clientSecret: GOOGLE_SECRET
// 			// })
// 		]
// 	})
// );
