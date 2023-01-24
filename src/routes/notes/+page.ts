import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Note } from '$lib/note/note';

export const load: PageLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		// throw redirect(303, '/');
		return {
			notes: [],
			tags: []
		};
	}

	const [notes, tags, noteTags] = await Promise.all([
		supabaseClient.from('notes').select(), // get all notes
		supabaseClient.from('tags').select('tag, id'), // gets all the tags
		supabaseClient.from('note_tags').select('note_id!inner(id), id, tag_id (tag, id)') // all tags that are associated with a note
	]);

	if (tags.error) {
		console.error(tags.error);
	}

	if (notes.error) {
		console.error(notes.error);
	}

	if (noteTags.error) {
		console.error(noteTags.error);
	}

	// merge tags into notes
	notes.data = notes.data.map((n) => {
		const nts = noteTags.data.filter((nt) => nt.note_id.id === n.id);
		n.tags = nts.map((nt) => {
			return { name: nt.tag_id.tag, id: nt.tag_id.id };
		});
		return n;
	});

	return {
		notes: notes.data ? notes.data : [],
		tags: tags.data ? tags.data : []
	};
};
