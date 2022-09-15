const { ipcRenderer, contextBridge } = require('electron');

const WINDOW_API = {
	GetVersion: (args) => ipcRenderer.invoke('get/version', args)
};

// window.api
contextBridge.exposeInMainWorld('api', WINDOW_API);
