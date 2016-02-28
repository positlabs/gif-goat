#!/bin/bash

# Name of your app.
APP="GifGoat"
# The path of you app to sign.
APP_PATH="./dist/GifGoat-mas-x64/GifGoat.app"
# The path to the location you want to put the signed package.
RESULT_PATH="./dist/$APP.pkg"

# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Joshua Beckwith (DLG2VT3336)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Joshua Beckwith (DLG2VT3336)"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"
ASAR_UNPACKED_PATH="$APP_PATH/Contents/Resources/app.asar.unpacked"

codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$ASAR_UNPACKED_PATH/bin/ffmpeg/darwin/x64/ffmpeg"
codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$ASAR_UNPACKED_PATH/bin/ffmpeg/darwin/x64/ffprobe"
codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$ASAR_UNPACKED_PATH/bin/gifsicle/gifsicle"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/Libraries/libnode.dylib"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/Electron Framework"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/$APP Helper.app/"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/$APP Helper EH.app/"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/child.plist" "$FRAMEWORKS_PATH/$APP Helper NP.app/"
# codesign --deep -fs "$APP_KEY" --entitlements "./build/mac-extras/parent.plist" "$APP_PATH"
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"