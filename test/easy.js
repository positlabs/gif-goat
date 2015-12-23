#!/usr/bin/env node

/*
	https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
	https://github.com/konsumer/easy-ffmpeg
*/
var fs = require('fs');

var ffmpeg = require('easy-ffmpeg');
var vidPath = 'videos/mov_bbb_mp4.mp4';

var command = ffmpeg()
	.input(vidPath)
	.on('progress', ()=>{
		console.log(progress);
	})
	.output('./videos/asdf.gif')
	.run();

