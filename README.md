# gif-pal

An app for making gifs that don't suck.

Uses ffmpeg palettegen and paletteuse filters to create higher quality gifs.

Currently only works on mac.



## install dependencies

`npm run install`



## TODOs

- use node-ffmpeg https://www.npmjs.com/package/ffmpeg
- point node-ffmpeg to ffmpeg binaries
- configurable output dir
- show encoding progress
- drag/drop gui using node-webkit

- install polymer

- npm scripts
	- install nw binaries?

- build process for various platforms (macOS, linux, windows)
	- script for downloading nw binaries?
















## encode_gifs usage

encoding all videos in a directory (shallow):

`encode_gifs --dir=/path/to/videos/`

encoding a single video file:

`encode_gifs -i /path/to/video.mp4`

By default, the gifs will be created in the same directory. Output directory can be set

`encode_gifs -i /path/to/video.mp4 -o /path/to/output/dir/`







