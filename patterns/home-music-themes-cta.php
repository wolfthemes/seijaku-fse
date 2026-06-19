<?php
/**
 * Title: Home Music Themes CTA
 * Slug: seijaku-fse/home-music-themes-cta
 * Categories: call-to-action
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>","dimRatio":55,"minHeight":440,"minHeightUnit":"px","align":"full","className":"wolf-music-cta is-dark has-texture"} -->
<div class="wp-block-cover alignfull wolf-music-cta is-dark has-texture" style="min-height:440px">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-50 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero-music-themes.jpg' ); ?>" data-object-fit="cover"/>

	<div class="wp-block-cover__inner-container">

		<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10"}}}} -->
		<div class="wp-block-columns are-vertically-aligned-center" style="padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10)">

			<!-- wp:column {"verticalAlignment":"center","width":"65%"} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:65%">

				<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"clamp(2.5rem, 5vw, 4rem)","fontWeight":"700","lineHeight":"1.1"},"color":{"text":"#ffffff"}}} -->
				<h2 class="wp-block-heading has-text-color" style="color:#ffffff;font-size:clamp(2.5rem, 5vw, 4rem);font-weight:700;line-height:1.1">Need a theme for musicians?</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"color":{"text":"rgba(255,255,255,0.75)"},"typography":{"fontSize":"1.125rem"},"spacing":{"margin":{"top":"0.75rem"}}}} -->
				<p class="has-text-color" style="color:rgba(255,255,255,0.75);font-size:1.125rem;margin-top:0.75rem">Browse Our Themes Tailored for Musicians</p>
				<!-- /wp:paragraph -->

			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","width":"35%","layout":{"type":"flex","justifyContent":"right"}} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:35%">

				<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
				<div class="wp-block-buttons">
					<!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"0px"},"typography":{"fontWeight":"600"},"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"2rem","right":"2rem"}}}} -->
					<div class="wp-block-button"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="<?php echo esc_url( home_url( '/music-wordpress-themes/' ) ); ?>" style="border-radius:0px;font-weight:600;padding-top:1rem;padding-bottom:1rem;padding-left:2rem;padding-right:2rem">Discover Music Themes</a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->

			</div>
			<!-- /wp:column -->

		</div>
		<!-- /wp:columns -->

	</div>
</div>
<!-- /wp:cover -->
