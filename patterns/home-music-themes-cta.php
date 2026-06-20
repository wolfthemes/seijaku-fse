<?php
/**
 * Title: Home Music Themes CTA
 * Slug: seijaku-fse/home-music-themes-cta
 * Categories: call-to-action
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>","dimRatio":60,"minHeight":440,"minHeightUnit":"px","align":"full","style":{"spacing":{"margin":{"top":"0"}}},"className":"wolf-music-cta is-dark has-texture"} -->
<div class="wp-block-cover alignfull wolf-music-cta is-dark has-texture" style="margin-top:0;min-height:440px">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-60 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>" data-object-fit="cover"/>

	<div class="wp-block-cover__inner-container">

		<!-- wp:group {"align":"full","layout":{"type":"constrained","contentSize":"var(--wp--style--global--wide-size)"}} -->
		<div class="wp-block-group alignfull">

			<!-- wp:columns {"verticalAlignment":"center"} -->
			<div class="wp-block-columns are-vertically-aligned-center">

				<!-- wp:column {"verticalAlignment":"center"} -->
				<div class="wp-block-column is-vertically-aligned-center">

					<!-- wp:heading {"level":2} -->
					<h2 class="wp-block-heading">Need a theme for musicians?</h2>
					<!-- /wp:heading -->

					<!-- wp:paragraph -->
					<p>Browse Our Themes Tailored for Musicians</p>
					<!-- /wp:paragraph -->

				</div>
				<!-- /wp:column -->

				<!-- wp:column {"verticalAlignment":"center","layout":{"type":"flex","justifyContent":"right"}} -->
				<div class="wp-block-column is-vertically-aligned-center">

					<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
					<div class="wp-block-buttons">
						<!-- wp:button -->
						<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( home_url( '/music-wordpress-themes/' ) ); ?>">Discover Music Themes</a></div>
						<!-- /wp:button -->
					</div>
					<!-- /wp:buttons -->

				</div>
				<!-- /wp:column -->

			</div>
			<!-- /wp:columns -->

		</div>
		<!-- /wp:group -->

	</div>
</div>
<!-- /wp:cover -->
