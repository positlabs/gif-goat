'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;
const argv = require('yargs').argv;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let previews = [];

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 400, 
		height: 600,
		// title: 'GIFFLY',
		minWidth: 400, 
		minHeight: 520,
		darkTheme: true,
		useContentSize: true //The width and height would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger.
	});

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open the DevTools.
	if(argv.debug){ // only do this if we're in dev mode
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
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
		gif: options.gif
	});
	preview.webContents.executeJavaScript(`
		window.render(${data});
	`);

	previews.push(preview);
});