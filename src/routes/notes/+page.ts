import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageLoad = async (event) => {
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

	const notesRes = await supabaseClient.from('notes').select(); // merge note tags into notes here
	// .order('updated_at', { ascending: false }); // order doesn't really matter because of sort

	if (notesRes.error) {
		console.error(notesRes.error);
	}

	return {
		notes: notesRes.data ? notesRes.data : [],
		tags: tagsRes.data ? tagsRes.data : []
	};
};
