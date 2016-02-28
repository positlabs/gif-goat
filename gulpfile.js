'use strict';

const gulp = require('gulp');
// TODO: use version in node_modules when they upversion to support MAS builds
// const packager = require('electron-packager');
const packager = require('../electron-packager/'); 
const pkg = require('./package.json');

// TODO task for running app in dev mode
// - should open browser window with node-inspector
// https://www.npmjs.com/package/gulp-node-inspector
// ./node_modules/.bin/electron main.js --debug

// https://www.npmjs.com/package/electron-packager
gulp.task('build-mac', [], callback => {

	/*

		https://www.npmjs.com/package/electron-packager#packageropts-callback
		
	*/
	let opts = {
		// The source directory.
		dir: './',

		// The application name.
		name: 'GifGoat',
		icon: './build/mac-extras/icons/icon.icns',

		// Allowed values: linux, win32, darwin, all
		// platform: 'darwin',
		platform: 'mas',
		// platform: pkg.pro ? 'mas' : 'darwin',

		// Allowed values: ia32, x64, all
		// Not required if all is used. The non-all values correspond to the architecture names used by Electron releases.
		arch: 'x64',

		// Electron version (without the 'v') - for example, 0.33.9. See Electron releases for valid versions.
		// match dev runtime and build runtime
		version: require('./node_modules/electron-prebuilt/package.json').version,

		'app-copyright': 'Posit Labs 2016',

		'app-version': pkg.version,
		'build-version': pkg.version,
		
		asar: true,
		'asar-unpack-dir': 'bin/',

		'app-bundle-id': 'com.positlabs.gifgoat',
		'app-category-type': 'public.app-category.utilities',

		sign: '3rd Party Mac Developer Application: Joshua Beckwith (DLG2VT3336)',
		'sign-entitlements': './build/mac-extras/parent.plist',
		'entitlements-inherit': './build/mac-extras/child.plist',

		prune: true,

		ignore: [
			'/bin/ffmpeg/linux($|/)',
			'/bin/ffmpeg/win32($|/)',
			'/dist($|/)',
			'/build($|/)',
			'/test($|/)',
		],

		out: './dist/',
		overwrite: true

	};

	packager(opts, (err, appPath) => {
		if(err){
			console.log('error!!', err);
		}else{
			console.log('appPath', appPath);
			callback();
		}
	});

});

gulp.task('default', [], function(){});