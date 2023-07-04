import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/** @type {import('@sveltejs/kit').RequestHandler} */

export const POST = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { index } = await event.request.json();

	const { data, error: err } = await supabaseClient
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

export const PATCH = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const data = await event.request.json();
	const { note_id } = data;
	delete data.note_id;

	const { error: err } = await supabaseClient
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

export const DELETE = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { note_id } = await event.request.json();

	// delete all note_tags that reference note, change this to be done on a db level?
	const { error: err1 } = await supabaseClient.from('note_tags').delete().eq('note_id', note_id);

	if (err1) {
		throw error(501, err1.message);
	}

	// delete note
	const { error: err2 } = await supabaseClient.from('notes').delete().eq('id', note_id);

	if (err2) {
		throw error(501, err2.message);
	}

	return new Response('great success');
}) satisfies RequestHandler;
