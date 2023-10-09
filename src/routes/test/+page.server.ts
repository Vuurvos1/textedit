import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// users,
import { notes, note_tags } from '$lib/schema';
// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

// const connectionString = process.env.DATABASE_URL;

// export const db = drizzle();

export const load = (async ({ params }) => {
	// const client = await postgres(
	// );
	// const db = await drizzle(client);
	// console.log(await db.select().from(users));
	// console.log(await db.select().from('notes'));
	// const post = await getPostFromDatabase(params.slug);
	// const allUsers = await db.select().from(users);
	// console.log(allUsers);
	// if (allUsers) {
	// 	return allUsers;
	// }
	// throw error(404, 'Not found');
}) satisfies PageServerLoad;
