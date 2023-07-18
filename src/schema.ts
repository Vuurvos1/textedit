import { pgTable, serial, text, varchar, bigint, PgUUID, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';

export const users = pgTable('auth.users', {
	id: serial('id').primaryKey()
	// fullName: text('full_name'),
	// phone: varchar('phone', { length: 256 })
});

export const notes = pgTable('notes', {
	id: serial('id').primaryKey(),
	created_at: timestamp('created_at'),
	updated_at: timestamp('updated_at'),
	user_id: serial('user_id').references(() => users.id),
	title: text('title'),
	content: text('content'),
	status: text('status') // could be enum .$type<"public" | "private">(),
	// data: drizzle.jsonb('data') // currently unused
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	// created_at: drizzle.timestamp('created_at'),
	user_id: serial('user_id').references(() => users.id),
	name: varchar('name', { length: 255 })
});

export const note_tags = pgTable('note_tags', {
	id: serial('id').primaryKey(),
	// created_at: drizzle.timestamp('created_at'),
	// user_id: serial('user_id').references(() => users.id),
	note_id: serial('note_id').references(() => notes.id),
	tag_id: serial('tag_id').references(() => tags.id)
});

// const connectionString = process.env.DATABASE_URL
// const client = postgres(connectionString)
// const db = drizzle(client);

// const allUsers = await db.select().from(users);
