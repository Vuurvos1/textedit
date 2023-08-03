import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// TODO: move this logic into the patch method of a note?
export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const { note_id, tag_id } = await request.json();

	const { data, error: err } = await supabase
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
