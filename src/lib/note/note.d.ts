import type { Tag } from '$lib/sidebar/tags';

export type NoteStatus = 'notes' | 'public' | 'archived' | 'deleted';

export type Note = {
	id: string;
	created_at: string; // date string
	updated_at: string; // date string
	title: string;
	content: string; // actual note
	data: { [key: string]: any }; // TODO figure out how to implement
	status: NoteStatus; // TODO change/remove notes status
	tags: Tag[]; // TODO figure out how this works
};
