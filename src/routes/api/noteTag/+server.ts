import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	// TODO: move this logic into the patch method of a note?

	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw error(401, 'Unauthorized');
	}
	const { note_id, tag_id } = await event.request.json();

	const { data, error: err } = await supabaseClient
		.from('note_tags')
		.insert({
			user_id: session.user.id,
			tag_id: tag_id,
			note_id: note_id
		})
		.select();

	if (err) {
		throw error(501, err.message);
	}

	return new Response(JSON.stringify(data[0]));
}) satisfies RequestHandler;
