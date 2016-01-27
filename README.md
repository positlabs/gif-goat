# gif-pal

An app for making gifs that don't suck.

Uses ffmpeg palettegen and paletteuse filters to create higher quality gifs.



## install dependencies

`npm run install`



## run dev

`npm start`



## TODOs

- build process for various platforms (macOS, linux, windows)
	- script for downloading nw binaries?

## Notes

- use https://cloudconvert.com/png-to-icns to generate icns for mac

- gifsicle bins are pulled from the npm package, so for now, need to build platforms natively (mac, win, linux). Could probably pull out this logic into a build process and local module.