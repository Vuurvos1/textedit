import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent();

	if (!session) {
		// throw redirect(303, '/');
		return {
			notes: [],
			tags: []
		};
	}

	const [notes, tags, noteTags] = await Promise.all([
		supabase.from('notes').select(), // get all notes
		supabase.from('tags').select('name, id'), // gets all the tags
		supabase.from('note_tags').select('note_id!inner(id), id, tag_id (name, id)') // all tags that are associated with a note
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
	notes.data = notes.data?.map((n) => {
		const nts = noteTags.data?.filter((nt) => nt.note_id.id === n.id);
		n.tags = nts?.map((nt) => {
			return { id: nt.id, name: nt.tag_id.name, tag_id: nt.tag_id.id };
		});
		return n;
	});

	return {
		notes: notes.data ? notes.data : [],
		tags: tags.data ? tags.data : []
	};
};
