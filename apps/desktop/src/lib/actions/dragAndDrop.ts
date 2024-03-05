export type DropEffect = 'move' | 'none' | 'link' | 'copy';

export type DropZoneOptions = {
	dropEffect?: DropEffect;
	dragoverClasses?: string[];
	onDropzone?: (data: string, ev: DragEvent) => void;
};

export function draggable(node: HTMLElement, data: string) {
	let state = data;

	node.draggable = true;
	// node.style.userSelect = 'none';
	// node.style.cursor = 'grab';

	function handleDragstart(ev: DragEvent) {
		ev.dataTransfer?.setData('text/plain', state);
	}

	node.addEventListener('dragstart', handleDragstart);

	return {
		update(data) {
			state = data;
		},
		destroy() {
			node.removeEventListener('dragstart', handleDragstart);
		}
	};
}

// /** @type {import('svelte/action').Action}  */
export function dropzone(node: HTMLElement, options: DropZoneOptions) {
	let state: Record<string, any> & DropZoneOptions = {
		dropEffect: 'move',
		dragoverClasses: ['dragover'],
		onDropzone: (data: string, ev: DragEvent) => {},
		...options
	};

	function handleDragenter(ev: DragEvent) {
		node.classList.add(...state.dragoverClasses);
		// ev.preventDefault();
	}

	function handleDragleave(ev: DragEvent) {
		ev.preventDefault();
		const target = ev.target as HTMLElement;
		target.classList.remove(...state.dragoverClasses);
	}

	function handleDragover(ev: DragEvent) {
		ev.preventDefault();
		//   ev.stopPropagation();
		ev.dataTransfer.dropEffect = state.dropEffect;
	}

	function handleDrop(ev: DragEvent) {
		ev.preventDefault();
		// ev.target.classList.remove(state.dragoverClass);
		const data = ev.dataTransfer.getData('text/plain');
		node.classList.remove(...state.dragoverClasses);
		state.onDropzone(data, ev);
		// node.dispatchEvent(new CustomEvent('drop', {detail: data}));
	}

	// function handleDragend(event: DragEvent) {
	// 	event.dataTransfer?.clearData();
	// }

	node.addEventListener('dragenter', handleDragenter);
	node.addEventListener('dragleave', handleDragleave);
	node.addEventListener('dragover', handleDragover);
	// node.addEventListener('dragend', handleDragend);
	node.addEventListener('drop', handleDrop);

	return {
		update(options) {
			state = {
				dropEffect: 'move',
				dragoverClasses: ['dragover'],
				...options
			};
		},
		destroy() {
			node.removeEventListener('dragenter', handleDragenter);
			node.removeEventListener('dragleave', handleDragleave);
			node.removeEventListener('dragover', handleDragover);
			node.removeEventListener('drop', handleDrop);
		}
	};
}
