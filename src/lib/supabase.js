import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const user = writable(supabase.auth.user());
// export const session = writable({});

supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user ?? null);
});

export function signIn() {}
export function singOut() {}

// export default supabase;

// export const signIn = async (provider) => {
// 	try {
// 		/*
// 		 ** if logging in on a page other than `/`:
// 		 ** to prevent a flash of content after login,
// 		 ** set redirectTo equal to your app's login page
// 		 */
// 		// { redirectTo: 'http://localhost:5173/login' }
// 		const { user, session, error } = await supabase.auth.signIn({ provider });
// 		if (error) console.error(error);

// 		console.log(user, session, await supabase.auth.user());
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// export const signOut = async () => {
// 	try {
// 		const { error } = await supabase.auth.signOut();
// 		if (error) throw error;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
