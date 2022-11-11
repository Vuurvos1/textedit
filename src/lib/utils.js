/**
 * @param {function} func
 * @param {number} delay
 */
export function debounce(func, delay = 250) {
	/** @type {setTimeout | any} */
	let timeout;

	/** @param {any} args */
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
