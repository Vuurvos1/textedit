export function clickOutside(node: HTMLElement) {
	const handleClick = (event: Event) => {
		if (node && !node.contains(event.target as Node)) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
