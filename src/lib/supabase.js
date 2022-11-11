import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

const getUser = async () => {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	user.set(session?.user);
};

export const user = writable({
	id: '',
	email: ''
});

getUser();

// export const session = writable({});

supabase.auth.onAuthStateChange((event, session) => {
	user.set(session?.user ?? null);
});

export function signIn() {}
export function singOut() {}

// export default supabase;
