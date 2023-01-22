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

	// query notes and merge tags into notes using note_tags
	// const newNotes = await supabaseClient.from('notes').select('*, tags!inner(*)'); // merge note tags into notes here
	// console.log(newNotes.data);
	// console.log(newNotes.data.map((n) => [n.title, n.tags]));

	const newNoteTags = await supabaseClient
		.from('note_tags')
		.select('note_id!inner(id), id, tag_id (tag, id)');
	// .eq('note_id.id', note.id);

	console.log(newNoteTags.data);

	// const { data, error } = await supabaseClient
	// .from('note_tags')
	// .select('note_id!inner(id), id, tag_id (tag, id)')
	// .eq('note_id.id', note.id);

	const tagsRes = await supabaseClient.from('tags').select('tag, id');

	if (tagsRes.error) {
		console.error(tagsRes.error);
	}

	const notesRes = await supabaseClient.from('notes').select(); // merge note tags into notes here
	// .order('updated_at', { ascending: false }); // order doesn't really matter because of sort

	if (notesRes.error) {
		console.error(notesRes.error);
	}

	const mergedNotes = notesRes.data.map((n) => {
		const noteTags = newNoteTags.data.filter((nt) => nt.note_id.id === n.id);
		n.tags = noteTags.map((nt) => nt.tag_id.tag);
		return n;
	});

	console.log(mergedNotes.map((n) => [n.title, n.tags]));

	return {
		notes: notesRes.data ? notesRes.data : [],
		tags: tagsRes.data ? tagsRes.data : []
	};
};
