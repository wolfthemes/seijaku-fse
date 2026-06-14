/**
 * Seijaku FSE — build config.
 *
 * Extends @wordpress/scripts' webpack config so we stay on the WordPress
 * standard toolchain: SCSS, PostCSS + Autoprefixer, RTL generation, source
 * maps, JS transpile/minify and the *.asset.php dependency manifests are all
 * inherited unchanged. We only re-point the entries at this theme's source and
 * add a BrowserSync live-reload during development.
 *
 *   src/styles/main.scss  ->  build/main.css   (+ build/main.asset.php)
 *   src/scripts/theme.js  ->  build/theme.js   (+ build/theme.asset.php)
 *
 *   npm run build   production bundle (minified, hashed asset versions)
 *   npm start       watch + BrowserSync, proxying the docker site
 *
 * Override the proxied URL with WP_PROXY=http://localhost:8080/ if needed.
 */
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

module.exports = ( env, argv = {} ) => {
	const isProduction = argv.mode === 'production';

	const plugins = [ ...defaultConfig.plugins ];

	// Live-reload the running docker site during `npm start` only — never in a
	// production build, so CI/release output stays free of dev tooling.
	if ( ! isProduction ) {
		plugins.push(
			new BrowserSyncPlugin(
				{
					host: 'localhost',
					port: 3000,
					proxy: process.env.WP_PROXY || 'http://localhost:8080/',
					files: [ '**/*.php', '**/*.html', './build/**/*' ],
					notify: false,
					open: false,
					ghostMode: false,
				},
				{ reload: true, injectChanges: true }
			)
		);
	}

	return {
		...defaultConfig,
		plugins,
		entry: {
			// SCSS entry — MiniCssExtractPlugin (from @wordpress/scripts) emits
			// build/main.css. The companion build/main.js it produces is an empty
			// runtime stub and is intentionally not enqueued.
			main: path.resolve( __dirname, 'src/styles/main.scss' ),
			// Front-end interactions (scroll reveals, condensing header).
			theme: path.resolve( __dirname, 'src/scripts/theme.js' ),
		},
		output: {
			...defaultConfig.output,
			clean: true,
			path: path.resolve( __dirname, 'build' ),
		},
	};
};
