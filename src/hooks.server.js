// import { supabase } from '$lib/supabase';

// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
// 	const session = event.cookies.get('session');

// 	console.log(session);

// 	if (!session) {
// 		return await resolve(event);
// 	}

// 	const user = {};
// 	// const user = await // get user from supabase

// 	if (user) {
// 		event.locals.user = {
// 			user: 'username',
// 			role: 'role'
// 		};
// 	}

// 	return await resolve(event);
// }

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
