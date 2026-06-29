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
	overrides: [
		{
			files: [ '*.guty.tsx' ],
			globals: {
				Block: 'readonly',
				Button: 'readonly',
				Buttons: 'readonly',
				Column: 'readonly',
				Columns: 'readonly',
				Container: 'readonly',
				Cover: 'readonly',
				Details: 'readonly',
				Footer: 'readonly',
				Header: 'readonly',
				Heading: 'readonly',
				Html: 'readonly',
				Image: 'readonly',
				List: 'readonly',
				ListItem: 'readonly',
				Main: 'readonly',
				Page: 'readonly',
				Paragraph: 'readonly',
				Pattern: 'readonly',
				PostContent: 'readonly',
				PostDate: 'readonly',
				PostExcerpt: 'readonly',
				PostFeaturedImage: 'readonly',
				PostTemplate: 'readonly',
				PostTitle: 'readonly',
				Query: 'readonly',
				QueryNoResults: 'readonly',
				QueryPagination: 'readonly',
				QueryPaginationNext: 'readonly',
				QueryPaginationPrevious: 'readonly',
				QueryTitle: 'readonly',
				Section: 'readonly',
				Shortcode: 'readonly',
				Spacer: 'readonly',
				TemplatePart: 'readonly',
			},
		},
	],
};
