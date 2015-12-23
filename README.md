# gif-pal

An app for making gifs that don't suck.

Uses ffmpeg palettegen and paletteuse filters, so it might bork if you are running an older version of ffmpeg. Tested using v2.8.3.

Currently only works on mac.



## install dependencies

`npm install`



## encode_gifs usage

encoding all videos in a directory (shallow):

`encode_gifs --dir=/path/to/videos/`

encoding a single video file:

`encode_gifs -i /path/to/video.mp4`

By default, the gifs will be created in the same directory. Output directory can be set

`encode_gifs -i /path/to/video.mp4 -o /path/to/output/dir/`



## TODOs

- use node-ffmpeg https://www.npmjs.com/package/ffmpeg
- configure output dir
- show progress
- drag/drop gui using node-webkit
