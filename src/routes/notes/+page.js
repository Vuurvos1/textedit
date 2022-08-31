export async function load() {
	/** @type {import('$lib/sidebar/types').Tag[]} */
	const tags = [
		{ name: 'blogs', tags: [{ name: 'main' }] },
		{
			name: 'dev',
			tags: [
				{ name: 'linux' },
				{ name: 'svelte', tags: [{ name: 'kit' }, { name: 'components' }] },
				{ name: 'git' }
			]
		},
		{ name: 'research' },
		{ name: 'videos' }
	];

	return {
		tags: tags
	};
}
