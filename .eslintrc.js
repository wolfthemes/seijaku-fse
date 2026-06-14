/**
 * ESLint config — extends the WordPress defaults from @wordpress/scripts.
 * https://www.npmjs.com/package/@wordpress/eslint-plugin
 */
module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	env: {
		browser: true,
	},
	globals: {
		wp: 'readonly',
		wolfBlank: 'readonly',
	},
};
