
	/** @type {import('svelte/action').Action}  */
export function draggable(node: HTMLElement, data: any) {
  let state = data;

  node.draggable = true;
  // node.style.userSelect = 'none';
  // node.style.cursor = 'grab';


  function handleDragstart(ev: DragEvent) {
    ev.dataTransfer?.setData('text/plain', state);
  }

  node.addEventListener('dragstart', handleDragstart)

  return {
    update(data) {
      state = data;
    },
    destroy() {
      node.removeEventListener('dragstart', handleDragstart)
    }
  }
}

	/** @type {import('svelte/action').Action}  */
export function dropzone(node: HTMLElement, options: {dropEffect?: 'move' | 'none' | 'link' | 'copy', dragoverClass?: string, onDropzone?: (data: any, ev: DragEvent) => void}) {
  let state = {
    dropEffect: 'move',
    dragoverClass: 'dragover',
    onDropzone: () => {},
    ...options
  }

  function handleDragenter(ev: DragEvent) {
    // const target = ev.target as HTMLElement;
    node.classList.add(state.dragoverClass);
    // ev.preventDefault();
    // ev.stopPropagation();
    // node.classList.add(state.dragoverClass);
  } 

  function handleDragleave(ev: DragEvent) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    target.classList.remove(state.dragoverClass);
    // ev.stopPropagation();
  }

  function handleDragover(ev: DragEvent) {
    ev.preventDefault();
  //   ev.stopPropagation();
    ev.dataTransfer.dropEffect = state.dropEffect;
  }

  function handleDrop(ev: DragEvent) {
    ev.preventDefault();
    const data  = ev.dataTransfer.getData('text/plain');
    // const target = ev.target as HTMLElement;
    node.classList.remove(state.dragoverClass);
    state.onDropzone(data, ev)
 
    // ev.target.classList.remove(state.dragoverClass);
    // const data = ev.dataTransfer.getData('text/plain');
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
        dragoverClass: 'dragover',
        ...options
      }
    },
    destroy() {
      node.removeEventListener('dragenter', handleDragenter);
      node.removeEventListener('dragleave', handleDragleave);
      node.removeEventListener('dragover', handleDragover);
      node.removeEventListener('drop', handleDrop);
    } 
  }

}
