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
		console.log('progress', progress);
	})
	.output( path.join(__dirname, './videos/asdf.gif') )
	.run();

