#!/usr/bin/env node

/*

	https://github.com/fluent-ffmpeg/node-fluent-ffmpeg

	Setting binary paths manually

	Ffmpeg.setFfmpegPath(path) full path to the ffmpeg binary.
	Ffmpeg.setFfprobePath(path) full path to the ffprobe binary.
	Ffmpeg.setFlvtoolPath(path) full path to the flvtool2 or flvmeta binary.

*/

var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');
var path = require('path');
var vidPath = path.join(__dirname, './videos/mov_bbb_mp4.mp4');

var command = ffmpeg()
	.input(vidPath)
	.on('progress', progress => {
		console.log('progress', progress.percent);
	})
	.on('error', function(err, stdout, stderr) {
		console.log('Cannot process video: ' + err.message);
	})
	.on('end', function() {
		console.log('Transcoding succeeded !');
	})
	.save( path.join(__dirname, './videos/asdf.gif') );

