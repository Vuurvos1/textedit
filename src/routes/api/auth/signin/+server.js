import { supabase } from '$lib/supabase';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { provider } = await request.json();

	// console.log('prov', await request.json());

	if (provider) {
		const { user, session, error } = await supabase.auth.signIn({ provider });
		console.log(user, session, error);
	}

	// 	try {
	// 		/*
	// 		 ** if logging in on a page other than `/`:
	// 		 ** to prevent a flash of content after login,
	// 		 ** set redirectTo equal to your app's login page
	// 		 */
	// 		// { redirectTo: 'http://localhost:5173/login' }
	// 		if (error) console.error(error);

	// 		console.log(user, session, await supabase.auth.user());
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// request.body.get('provider'));

	// let email = request.body.get('email');
	// let password = request.body.get('password');
	// const { session, error } = await supabase.auth.signIn({ email, password });
	// if (error) {
	// 	return {
	// 		status: error.status,
	// 		body: error.message
	// 	};
	// }
	// return {
	// 	status: 200,
	// 	body: 'success',
	// 	headers: {
	// 		'set-cookie': `session=${JSON.stringify(
	// 			session
	// 		)}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${new Date(
	// 			session.expires_at * 1000
	// 		).toUTCString()};`
	// 	}
	// };
}
