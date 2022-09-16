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
