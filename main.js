'use strict';
const electron = require('electron');
const app = electron.app;
const autoUpdater = electron.autoUpdater;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;
const argv = require('yargs').argv;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let previews = [];

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {

	mainWindow = new BrowserWindow({
		width: 400, 
		height: 600,
		minWidth: 400, 
		minHeight: 520,
		darkTheme: true,
		useContentSize: true //The width and height would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger.
	});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open the DevTools.
	if(argv.debug){ // only do this if we're in dev mode
		// mainWindow.webContents.openDevTools();
	}

	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
		previews.forEach(preview => {
			// complains if a window is already closed
			try{preview.close();}catch(e){}
			preview = null;
		})
	});
});

ipc.on('open-preview', (e, options) => {
	// console.log(options);

	var preview = new BrowserWindow({
		width: options.width, 
		height: options.height,
		darkTheme: true,
		resizable: false,
		useContentSize: true
	});

	preview.loadURL('file://' + __dirname + '/view-gif.html');

	// doesn't seem to do anything...
	// preview.setRepresentedFilename(options.gif);

	var data = JSON.stringify({
		gif: options.gif,
		width: options.width,
		height: options.height
	});
	preview.webContents.executeJavaScript(`
		window.render(${data});
	`);

	previews.push(preview);
});


