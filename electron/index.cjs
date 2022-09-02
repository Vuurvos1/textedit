const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

// Common app functions
// const name = app.getName();
// const version = app.getVersion();
// const platform = process.platform();
// const downloadsFolder = app.getPath('downloads');

const creatWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadFile(join(__dirname, './dist/index.html'));
};

app.whenReady().then(() => {
	creatWindow();
});
