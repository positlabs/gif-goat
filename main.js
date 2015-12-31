'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

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
		title: 'GIFFLY',
		minWidth: 400, 
		minHeight: 520,
		darkTheme: true,
		useContentSize: true //The width and height would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger.
	});

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});

ipc.on('request-output-dir', function(event, defaultPath){

	var options = {
		title: 'Select output folder',
		properties: ['openDirectory', 'createDirectory'],
	};
	if(defaultPath) options.defaultPath = defaultPath;

	dialog.showOpenDialog(mainWindow, options, (folders)=>{
		console.log('request-output-dir', folders);
		if(folders)
			event.sender.send('request-output-dir', folders[0]);
	});
});


var appPaths;
ipc.on('getPaths', function(event, arg){
	// console.log('getPath', arg);
	if(appPaths === undefined){
		appPaths = {};
		[
			'home',
			'appData',
			'userData',
			'temp',
			'exe',
			'desktop',
			'documents',
			'downloads',
			'videos'
		].forEach(name => {
			appPaths[name] = app.getPath(name);
		});
	}
	event.returnValue = appPaths;
});
