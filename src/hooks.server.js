// import { parse } from 'cookie';
// import { supabase } from '$lib/supabase';

// import { handleAuth } from '@supabase/auth-helpers-sveltekit';
// import { sequence } from '@sveltejs/kit/hooks';

// export const handle = sequence(...handleAuth());

// export const getSession = async (event) => {
// 	const { user, accessToken, error } = event.locals;
// 	return {
// 		user,
// 		accessToken,
// 		error
// 	};
// };

/*
 ** https://kit.svelte.dev/docs/hooks#handle
 */
// export const handle = async ({ event, resolve }) => {
// 	const cookies = parse(event.request.headers.cookie || '');

// 	console.log(cookies);

// 	/* if there are cookies named `session` and `user`, grab the info */
// 	// const cookies = await parse(event.request.headers.get('cookie') || '');
// 	// const session = cookies.session ? JSON.parse(cookies.session) : null;
// 	// const user = cookies.user ? JSON.parse(cookies.user) : null;

// 	// console.log(session, cookies, user, event.request.headers.get('cookie'));

// 	event.locals.foo = 'bar';

// 	// event.locals.user = await getUserInformation(event.request.headers.get('cookie'));

// 	/* set server-side auth for supabase */
// 	// if (session) supabase.auth.setAuth(session.access_token);

// 	/*
// 	 ** use event.locals to securely store session data, like access tokens, for use in js endpoints;
// 	 ** or for user data on the server-side.
// 	 ** `.user` here is arbitrary - use what you'd like.
// 	 */
// 	// event.locals.user = user;

// 	const response = await resolve(event);
// 	return response;
// };
