// based on https://github.com/grail-ui/grail-ui/tree/master/packages/grail-ui/src/focusTrap/focusTrap.ts

import { writable, readonly } from 'svelte/store';
import { createFocusTrap as _createFocusTrap } from 'focus-trap';
import type { Action } from 'svelte/action';

import type {
	ActivateOptions,
	DeactivateOptions,
	FocusTrap,
	Options as FocusTrapOptions
} from 'focus-trap';

type FocusTrapConfig = FocusTrapOptions & {
	/**
	 * Immediately activate the trap
	 */
	immediate?: boolean;
};

export const createFocusTrap = (config: FocusTrapConfig = {}) => {
	let trap: undefined | FocusTrap;

	const { immediate, ...focusTrapOptions } = config;
	const hasFocus = writable(false);
	const isPaused = writable(false);

	function pause() {
		if (trap) {
			trap.pause();
			isPaused.set(true);
		}
	}

	function unpause() {
		if (trap) {
			trap.unpause();
			isPaused.set(false);
		}
	}

	const activate = (opts?: ActivateOptions) => trap?.activate(opts);
	const deactivate = (opts?: DeactivateOptions) => trap?.deactivate(opts);

	const useFocusTrap: Action<HTMLElement> = (node) => {
		trap = _createFocusTrap(node, {
			...focusTrapOptions,
			onActivate() {
				hasFocus.set(true);
				config.onActivate?.();
			},
			onDeactivate() {
				hasFocus.set(false);
				config.onDeactivate?.();
			}
		});

		if (immediate) {
			activate();
		}

		return {
			destroy() {
				deactivate();
				trap = undefined;
			}
		};
	};

	return {
		useFocusTrap,
		hasFocus: readonly(hasFocus),
		isPaused: readonly(isPaused),
		activate,
		deactivate,
		pause,
		unpause
	};
};
