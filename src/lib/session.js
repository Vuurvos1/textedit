import { error } from '@sveltejs/kit';

export const handleSession = async (event, session) => {
	if (event === 'SIGNED_OUT') {
		try {
			await fetch('/api/cookie', {
				method: 'DELETE'
			});
		} catch (err) {
			throw error(500, JSON.stringify(err));
		}
		return { url: '/' };
	}
	if (event === 'SIGNED_IN') {
		try {
			await fetch('/api/cookie', {
				method: 'POST',
				body: JSON.stringify(session)
			});
		} catch (err) {
			throw error(500, JSON.stringify(err));
		}
		return { url: '/app' };
	}
	return false;
};
