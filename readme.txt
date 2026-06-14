=== Wolf Blank ===

Contributors: wolfthemes
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: full-site-editing, block-styles, blog, portfolio, wide-blocks, custom-colors, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready

Minimal FSE boilerplate for WolfThemes projects — a radical blank slate with zero WordPress default styling.

== Description ==

Wolf Blank is a Full Site Editing (FSE) WordPress block theme that renders a clean canvas with
zero WordPress default styling. Every design decision — colors, fonts, spacing — is exposed as a
clearly labeled placeholder token in theme.json, ready to be filled per project.

It is the foundation for the wolfthemes.com redesign and future WolfThemes builds, and is intended
to be copied and customized rather than used as-is.

Features:

* Full Site Editing — block templates and template parts, no PHP templates.
* theme.json v3 with all WordPress defaults disabled (palette, font sizes, spacing, gradients).
* Fluid typography scale (xs to 3xl) and a base-4 spacing scale (1 to 10).
* Modern CSS reset, no jQuery, no third-party JavaScript.
* WordPress Coding Standards + WordPress VIP compliant.

== Installation ==

1. In your WordPress dashboard, go to Appearance > Themes and click Add New.
2. Click Upload Theme and choose the wolf-blank.zip file, then click Install Now.
   (Or copy the wolf-blank folder into wp-content/themes/.)
3. Click Activate.
4. Edit design tokens in the Site Editor (Appearance > Editor) or directly in theme.json.

== Frequently Asked Questions ==

= Does this theme require any plugins? =

No. Wolf Blank is fully self-contained and has no plugin dependencies.

= Does it work with the Classic Editor or page builders? =

No. Wolf Blank is a block theme built for Full Site Editing and the block editor only.

= Where do I change colors and fonts? =

All design tokens live in theme.json (settings.color, settings.typography, settings.spacing) and
can also be edited visually in the Site Editor under Styles.

== Changelog ==

= 1.0.0 =
* Initial release.

== Copyright ==

Wolf Blank WordPress Theme, (C) 2026 Constantin Saguin (WolfThemes).
Wolf Blank is distributed under the terms of the GNU GPL version 2 or later.

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.

Wolf Blank bundles no third-party images, fonts, or icon assets. The CSS reset in
assets/css/global.css is based on Andy Bell's "A (more) Modern CSS Reset", used as a coding
technique under the MIT license (https://andy-bell.co.uk/a-more-modern-css-reset/).
