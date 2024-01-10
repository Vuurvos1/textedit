/**
 * Modifier keys
 * Mod: Cmd on MacOS and Ctrl on other OSes
 * Ctrl: Ctrl key on every OSes
 * Meta: Cmd on MacOS and Win key on other OSes
 * Alt: Alt key on every OS
 * Shift: Shift key on every OS
 */
export type Modifier = 'Mod' | 'Ctrl' | 'Shift' | 'Meta' | 'Alt';

export type Hotkey = {
	key: string;
	modifiers: Modifier[];
};
