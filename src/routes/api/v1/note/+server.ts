// import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	throw error(401, 'Unauthorized');

	const session = await getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { index } = await request.json();

	const { data, error: err } = await supabase
		.from('notes')
		.insert({
			user_id: session.user.id,
			title: index ? `Note ${index}` : 'Note'
		})
		.select();

	if (err) {
		throw error(501, err.message);
	}

	return new Response(JSON.stringify(data[0]));
}) satisfies RequestHandler;

export const PATCH = (async ({ request, locals: { supabase, getSession } }) => {
	throw error(401, 'Unauthorized');

	const session = await getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const data = await request.json();
	const { note_id } = data;
	delete data.note_id;

	const { error: err } = await supabase
		.from('notes')
		.update({
			user_id: session.user.id,
			...data
		})
		.match({ id: note_id })
		.single(); // TODO add RLS rule that also matches note id for update

	if (err) {
		throw error(501, err.message);
	}

	return new Response('note updated successfully');
}) satisfies RequestHandler;

export const DELETE = (async ({ request, locals: { supabase, getSession } }) => {
	throw error(401, 'Unauthorized');

	const session = await getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { note_id } = await request.json();

	// delete all note_tags that reference note, change this to be done on a db level?
	const { error: err1 } = await supabase.from('note_tags').delete().eq('note_id', note_id);

	if (err1) {
		throw error(501, err1.message);
	}

	// delete note
	const { error: err2 } = await supabase.from('notes').delete().eq('id', note_id);

	if (err2) {
		throw error(501, err2.message);
	}

	return new Response('great success');
}) satisfies RequestHandler;
