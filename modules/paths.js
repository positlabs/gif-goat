/*
	http://electron.atom.io/docs/v0.36.0/api/app/#app-getpath-name
*/
var paths = ipc.sendSync('getPaths');
module.exports = paths;