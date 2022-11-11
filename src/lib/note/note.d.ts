export type Note = {
	id: string;
	created_at: string; // date string
	updated_at: string; // date string
	title: string;
	content: string; // actual note
	data: { [key: string]: any }; // TODO figure out how to implement
	status: 'notes' | 'public' | 'archived' | 'deleted'; // TODO change/remove notes status
	tags: any; // TODO figure out how this works
};

export type Notes = Note[];
