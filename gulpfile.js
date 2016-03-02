'use strict';

const gulp = require('gulp');
const spawn = require('child_process').spawn;
const packager = require('electron-packager');
const pkg = require('./package.json');


const pro = pkg.pro === true;

// TODO task for running app in dev mode
// - should open browser window with node-inspector
// https://www.npmjs.com/package/gulp-node-inspector
// ./node_modules/.bin/electron main.js --debug

// https://www.npmjs.com/package/electron-packager
gulp.task('build-mac:app', [], callback => {

	/*

		https://www.npmjs.com/package/electron-packager#packageropts-callback
		
	*/
	let opts = {
		// The source directory.
		dir: './',

		// The application name.
		name: 'GifGoat',
		icon: './build/mac/icons/icon.icns',

		// Allowed values: linux, win32, darwin, all
		platform: pro ? 'mas' : 'darwin',

		// Allowed values: ia32, x64, all
		// Not required if all is used. The non-all values correspond to the architecture names used by Electron releases.
		arch: 'x64',

		// Electron version (without the 'v') - for example, 0.33.9. See Electron releases for valid versions.
		// match dev runtime and build runtime
		// version: require('./node_modules/electron-prebuilt/package.json').version,

		'app-copyright': 'Posit Labs 2016',

		'app-version': pkg.version,
		'build-version': Date.now(),
		
		asar: true,
		'asar-unpack-dir': 'bin/',

		'app-bundle-id': 'com.positlabs.gifgoat',
		'app-category-type': 'public.app-category.utilities',

		sign: '3rd Party Mac Developer Application: Joshua Beckwith (DLG2VT3336)',
		'sign-entitlements': pro ? './build/mac/parent.plist' : undefined,
		'entitlements-inherit': pro ? './build/mac/child.plist' : undefined,

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

	console.log(opts)

	packager(opts, (err, appPath) => {
		if(err){
			console.log('error!!', err);
		}else{
			console.log('appPath', appPath);
			callback();
		}
	});

});

gulp.task('build-mac:package', ['build-mac:app'], callback => {
	let free = pro ? '' : '-free';
	spawnProcess(`./build/mac/package-mac-app${free}.sh`, [])
		.catch(err => {
			console.log(err.message);
			callback();
		})
		.then(callback);
});

gulp.task('build-mac:install', ['build-mac:package'], callback => {
	let free = pro ? '' : '-free';

	// sign and package it
	spawnProcess('installer', ['-store', '-pkg', `./dist/GifGoat${free}.pkg`, '-target', '/'])
		.then(()=>{
			// open it
			return spawnProcess('open', ['/Applications/GifGoat.app/']);
		})
		.catch(err => {
			console.log(err.message);
			callback();
		})
		.then(callback);
});


function spawnProcess(cmd, args){
	console.log('spawnProcess', cmd, args);
	return new Promise((resolve, reject) => {

		let proc = spawn(cmd, args);
		proc.stdout.on('data', data => {
			console.log(`${data}`);
		});
		proc.stderr.on('data', data => {
			console.log(`${data}`);
		});
		proc.on('close', code => {
			// console.log(`child process exited with code ${code}`);
			resolve();
		});
	});
}

gulp.task('default', [], function(){});