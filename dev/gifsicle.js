var execFile = require('child_process').execFile;
var gifsicle = require('gifsicle');
 
execFile(gifsicle, [
	'-o',
	'/Volumes/space/Users/pixelfiend/Desktop/out.gif',
	'/Volumes/space/Users/pixelfiend/Desktop/in.gif',
	'--optimize',
	'--colors=128',
	'-O3' // slow optimization for lower file sizes. Not sure if this conflicts with --optimize
], err => {
	if(err) console.log(err.message);
	console.log('Image minified!');
});