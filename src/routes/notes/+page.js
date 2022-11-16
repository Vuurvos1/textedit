import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		// throw redirect(303, '/');
		return {
			notes: [],
			tags: []
		};
	}

	const tagsRes = await supabaseClient.from('tags').select('tag, id');

	if (tagsRes.error) {
		console.error(tagsRes.error);
	}

	const notesRes = await supabaseClient
		.from('notes')
		.select()
		.order('updated_at', { ascending: false });

	if (notesRes.error) {
		console.error(notesRes.error);
	}

	return {
		notes: notesRes.data ? notesRes.data : [],
		tags: tagsRes.data ? tagsRes.data : []
	};
}
