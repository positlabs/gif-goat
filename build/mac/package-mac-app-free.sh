#!/bin/bash

# Name of your app.
APP="GifGoat"
# The path of you app to sign.
APP_PATH="./dist/GifGoat-darwin-x64/GifGoat.app"
# The path to the location you want to put the signed package.
RESULT_PATH="./dist/$APP-free.pkg"

# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Joshua Beckwith (DLG2VT3336)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Joshua Beckwith (DLG2VT3336)"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"
ASAR_UNPACKED_PATH="$APP_PATH/Contents/Resources/app.asar.unpacked"

codesign --deep -fs "$APP_KEY" "$ASAR_UNPACKED_PATH/bin/ffmpeg/darwin/x64/ffmpeg"
codesign --deep -fs "$APP_KEY" "$ASAR_UNPACKED_PATH/bin/ffmpeg/darwin/x64/ffprobe"
codesign --deep -fs "$APP_KEY" "$ASAR_UNPACKED_PATH/bin/gifsicle/gifsicle"
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"