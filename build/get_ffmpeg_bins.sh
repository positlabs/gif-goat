#!/bin/sh
# borrowed from https://github.com/konsumer/easy-ffmpeg/blob/master/getbin.sh
# this collects the binaries for releases

VERSION='2.8.6'

cd ./bin/
rm -rf ffmpeg
mkdir -p ffmpeg/linux/ia32 ffmpeg/linux/x64 ffmpeg/darwin/x64 ffmpeg/win32/ia32 ffmpeg/win32/x64

# cd ffmpeg/linux
# curl 'http://johnvansickle.com/ffmpeg/releases/ffmpeg-release-32bit-static.tar.xz' -o ffmpeg-32.tar.xz && 
# tar xf ffmpeg-32.tar.xz && 
# mv ffmpeg-*-32bit-static/ffmpeg ffmpeg-*-32bit-static/ffprobe ia32
# curl 'http://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz' -o ffmpeg-64.tar.xz && 
# tar xf ffmpeg-64.tar.xz && 
# mv ffmpeg-*-64bit-static/ffmpeg ffmpeg-*-64bit-static/ffprobe x64
# rm -rf ffmpeg-*-*-static *.tar.xz

# cd ../darwin
cd ./ffmpeg/darwin
curl "http://evermeet.cx/ffmpeg/ffmpeg-$VERSION.7z" -o ffmpeg.7z && 
curl "http://evermeet.cx/ffmpeg/ffprobe-$VERSION.7z" -o ffprobe.7z &&
7z e ffmpeg.7z && 
7z e ffprobe.7z && 
mv ffmpeg ffprobe x64
# rm ffmpeg.7z ffprobe.7z

# cd ../win32
# curl "http://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-$VERSION-win32-static.7z" -o ffmpeg.7z &&
# 7z x ffmpeg.7z
# mv ffmpeg-*-win32-static/bin/ffmpeg.exe ffmpeg-*-win32-static/bin/ffprobe.exe ia32
# rm -rf ffmpeg.7z ffmpeg-*-win32-static

# cd ../win32
# curl "http://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-$VERSION-win64-static.7z" -o ffmpeg.7z &&
# 7z x ffmpeg.7z
# mv ffmpeg-*-win64-static/bin/ffmpeg.exe ffmpeg-*-win64-static/bin/ffprobe.exe x64
# rm -rf ffmpeg.7z ffmpeg-*-win64-static

# cd ../..
# tar czf ffmpeg.tgz ffmpeg/ &&
# rm -rf ffmpeg