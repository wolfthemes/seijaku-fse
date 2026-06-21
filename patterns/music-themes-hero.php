<?php
/**
 * Title: Music Themes Hero
 * Slug: seijaku-fse/music-themes-hero
 * Categories: hero
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>","dimRatio":10,"minHeight":100,"minHeightUnit":"vh","align":"full","className":"wolf-hero is-dark has-texture"} -->
<div class="wp-block-cover alignfull wolf-hero is-dark has-texture" style="min-height:100vh">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-10 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>" data-object-fit="cover"/>

	<div class="wp-block-cover__inner-container">

		<!-- wp:group {"className":"wolf-hero-dark__inner"} -->
		<div class="wp-block-group wolf-hero-dark__inner">

			<!-- wp:group {"className":"wolf-hero-dark__bottom","layout":{"type":"flex","orientation":"vertical"}} -->
			<div class="wp-block-group wolf-hero-dark__bottom">

				<!-- wp:paragraph {"className":"wolf-hero-dark__eyebrow"} -->
				<p class="wolf-hero-dark__eyebrow">Designed by an independent studio. Trusted by 35,000+ customers since 2011.</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":1,"className":"wolf-hero-dark__title"} -->
				<h1 class="wp-block-heading wolf-hero-dark__title">WordPress Themes Built For Creative Businesses</h1>
				<!-- /wp:heading -->

				<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
				<div class="wp-block-buttons">
					<!-- wp:button -->
					<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Browse themes</a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->

			</div>
			<!-- /wp:group -->

		</div>
		<!-- /wp:group -->

	</div>
</div>
<!-- /wp:cover -->
