<?php
/**
 * Title: Music Themes Hero
 * Slug: seijaku-fse/music-themes-hero
 * Categories: hero
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-services.jpg' ); ?>","dimRatio":70,"overlayColor":"contrast","minHeight":72,"minHeightUnit":"vh","align":"full","className":"has-texture","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|9"}}}} -->
<div class="wp-block-cover alignfull has-texture" style="padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--9);min-height:72vh">
	<span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-70 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-services.jpg' ); ?>" data-object-fit="cover"/>

	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"layout":{"type":"constrained","contentSize":"920px"}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.08em"}},"fontSize":"small"} -->
			<p class="has-small-font-size" style="letter-spacing:0.08em;text-transform:uppercase">WolfThemes Services</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"fontSize":"hero"} -->
			<h1 class="wp-block-heading has-hero-font-size">Music WordPress Themes</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"fontSize":"lg"} -->
			<p class="has-lg-font-size">Fast, hassle-free setup for WolfThemes WordPress themes, from clean installation to custom website setup.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"className":"wolf-btn-lg"} -->
				<div class="wp-block-button wolf-btn-lg"><a class="wp-block-button__link wp-element-button" href="/contact">Start a project</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
