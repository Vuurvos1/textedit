import { serial, text, pgTable, uuid, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const noteStatus = pgEnum('note_status', ['public', 'archived', 'deleted']);

export const notes = pgTable('notes', {
	id: uuid('id').defaultRandom().notNull().unique(),
	createdAt: timestamp('created_at')
		.default(sql`now()`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`now()`)
		.notNull(),
	title: text('title').default('').notNull(),
	content: text('content').default('').notNull(),
	status: noteStatus('status').default('public').notNull()
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey().notNull().unique(),
	createdAt: timestamp('created_at')
		.default(sql`now()`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`now()`)
		.notNull(),
	name: text('name').notNull()
});

export const note_tags = pgTable('note_tags', {
	id: serial('id').primaryKey().notNull().unique(),
	note_id: uuid('note_id')
		.references(() => notes.id)
		.notNull(),
	tag_id: serial('tag_id')
		.references(() => tags.id)
		.notNull()
});
