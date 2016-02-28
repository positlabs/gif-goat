#!/bin/bash

gulp build-mac && ./build/package_mac_app.sh && open ./dist/GifGoat.pkg