import { readDir, type FileEntry } from '@tauri-apps/api/fs';
import { writable } from 'svelte/store';

function sortFileTree(fileTree: FileEntry[]) {
	if (!fileTree || !fileTree.length) {
		return fileTree;
	}

	// Custom sort function to sort folders before files and then alphabetically or numerically
	function customSort(a, b) {
		function extractNumber(filename) {
			// Extracts the numeric part from the filename
			const match = filename.match(/\d+/);
			return match ? parseInt(match[0], 10) : NaN;
		}

		const aNumber = extractNumber(a.name);
		const bNumber = extractNumber(b.name);

		if (a.children && !b.children) {
			return -1; // a is a folder, so it comes before b
		} else if (!a.children && b.children) {
			return 1; // b is a folder, so it comes before a
		} else if (isNaN(aNumber) && isNaN(bNumber)) {
			// Neither filename has a numeric part, so sort alphabetically
			return a.name.localeCompare(b.name);
		} else if (isNaN(aNumber) || isNaN(bNumber)) {
			// One of the filenames has a numeric part, so the one without numbers comes first
			return isNaN(aNumber) ? -1 : 1;
		} else {
			// Both are numeric filenames, so sort numerically
			return aNumber - bNumber;
		}
	}

	// Sort the current level of the file tree
	fileTree.sort(customSort);

	// Recursively sort the children of each folder
	for (const node of fileTree) {
		if (node.children && node.children.length > 0) {
			node.children = sortFileTree(node.children);
		}
	}

	return fileTree;
}

function createFileTree() {
	const { subscribe, set } = writable<FileEntry[]>([]);

	async function load(path: string) {
		localStorage.setItem('filePath', path); // TODO: Move to a better place
		const files = await readDir(path, { recursive: true });
		console.time('sortFileTree');
		const sortedFiles = sortFileTree(files);
		console.timeEnd('sortFileTree');

		set(sortedFiles);
	}

	async function reload() {
		const path = localStorage.getItem('filePath');
		console.log('reloading');
		if (!path) return;
		await load(path);
	}

	reload();

	return {
		subscribe,
		load,
		reload,
		reset: () => set([])
	};
}

export const fileTree = createFileTree();
