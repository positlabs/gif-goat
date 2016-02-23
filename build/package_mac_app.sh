#!/bin/bash

# Name of your app.
APP="GifGoat"
# The path of you app to sign.
APP_PATH="./dist/GifGoat-darwin-x64/GifGoat.app"
# APP_PATH="./dist/GifGoat-mas-x64/GifGoat.app"
# The path to the location you want to put the signed package.
RESULT_PATH="./dist/$APP.pkg"

# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Joshua Beckwith (DLG2VT3336)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Joshua Beckwith (DLG2VT3336)"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/Libraries/libnode.dylib"
codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/Electron Framework"
codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/Electron Framework.framework/"
codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign --deep -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/child.plist" "$FRAMEWORKS_PATH/$APP Helper NP.app/"
codesign  -fs "$APP_KEY" --entitlements "$FRAMEWORKS_PATH/parent.plist" "$APP_PATH"
productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"