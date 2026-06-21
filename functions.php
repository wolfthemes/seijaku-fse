<?php
/**
 * Seijaku FSE — child theme bootstrap.
 *
 * Wolf Blank (the parent) handles theme supports and ships the global.css
 * reset/token layer. Here we load the compiled Seijaku design layer
 * (build/main.css) and the lightweight front-end script (build/theme.js),
 * both produced by `npm run build` from /src.
 *
 * @package SeijakuFSE
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

if ( ! defined( 'SEIJAKU_FSE_VERSION' ) ) {
	define( 'SEIJAKU_FSE_VERSION', '1.0.0' );
}

/**
 * Match the compiled stylesheet inside the block editor so the editing
 * canvas mirrors the front end.
 */
function seijaku_fse_setup() {
	if ( file_exists( get_theme_file_path( 'build/main.css' ) ) ) {
		add_theme_support( 'editor-styles' );
		add_editor_style( 'build/main.css' );
	}
}
add_action( 'after_setup_theme', 'seijaku_fse_setup' );

/**
 * Build the Google Fonts CSS2 URL from a simple family → variants map.
 * Add or remove entries here to trial different typefaces.
 */
function seijaku_fse_google_fonts_url() {
	$fonts = array(
		'Urbanist'     => 'wght@100..900',
		'Rethink+Sans' => 'ital,wght@0,400..800;1,400..800',
	);

	$families = array();
	foreach ( $fonts as $family => $variants ) {
		$families[] = 'family=' . $family . ':' . $variants;
	}

	return 'https://fonts.googleapis.com/css2?' . implode( '&', $families ) . '&display=swap';
}

/**
 * Front-end assets — the compiled design layer + interactions.
 *
 * Main.css is declared as a dependency-of-nothing but enqueued after the
 * parent's `wolf-blank-global` handle, so the cascade lands on top. Versions
 * use filemtime in dev for cache-busting and fall back to the theme version.
 */
function seijaku_fse_enqueue_assets() {
	$css_path = get_theme_file_path( 'build/main.css' );

	wp_enqueue_style( 'google-fonts', seijaku_fse_google_fonts_url(), array(), null ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion

	if ( file_exists( $css_path ) ) {
		wp_enqueue_style(
			'seijaku-fse',
			get_theme_file_uri( 'build/main.css' ),
			array( 'wolf-blank-global' ),
			(string) filemtime( $css_path )
		);
	}

	$js_path    = get_theme_file_path( 'build/theme.js' );
	$asset_path = get_theme_file_path( 'build/theme.asset.php' );

	if ( file_exists( $js_path ) ) {
		$asset = file_exists( $asset_path )
			? require $asset_path
			: array(
				'dependencies' => array(),
				'version'      => SEIJAKU_FSE_VERSION,
			);

		wp_enqueue_script(
			'seijaku-fse',
			get_theme_file_uri( 'build/theme.js' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'seijaku_fse_enqueue_assets' );
