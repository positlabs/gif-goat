/*
	http://electron.atom.io/docs/v0.36.0/api/app/#app-getpath-name
*/
var remote = require('electron').remote;

var paths = {};
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
	paths[name] = remote.app.getPath(name);
});

module.exports = paths;