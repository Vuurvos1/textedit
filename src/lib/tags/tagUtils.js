// Insert path into directory tree structure:
export function insertTag(tags = [], [head, ...tail]) {
	let child = tags.find((child) => child.name === head);
	if (!child) tags.push((child = { name: head, tags: [] }));
	if (tail.length > 0) insertTag(child.tags, tail);
	return tags;
}

export function insertTagBefore(tags = [], [head, ...tail]) {
	let child = tags.find((child) => child.name === head);
	if (!child) tags.unshift((child = { name: head, tags: [] }));
	if (tail.length > 0) insertTag(child.tags, tail);
	return tags;
}
