<?php
/**
 * Title: Hero — Collage
 * Slug: seijaku-fse/home-hero-collage
 * Categories: hero
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:group {"tagName":"section","align":"full","className":"wolf-hero wolf-hero-collage is-dark has-texture","style":{"dimensions":{"minHeight":"100vh"}},"layout":{"type":"default"}} -->
<section class="wp-block-group alignfull wolf-hero wolf-hero-collage is-dark has-texture" style="min-height:100vh">

	<!-- wp:columns {"verticalAlignment":"center","className":"wolf-hero-collage__inner"} -->
	<div class="wp-block-columns are-vertically-aligned-center wolf-hero-collage__inner">

		<!-- wp:column {"verticalAlignment":"bottom","className":"wolf-hero-collage__content","style":{"spacing":{"padding":{"top":"var:preset|spacing|11","bottom":"var:preset|spacing|11","left":"var:preset|spacing|10","right":"var:preset|spacing|9"}}}} -->
		<div class="wp-block-column is-vertically-aligned-bottom wolf-hero-collage__content" style="padding-top:var(--wp--preset--spacing--11);padding-bottom:var(--wp--preset--spacing--11);padding-left:var(--wp--preset--spacing--10);padding-right:var(--wp--preset--spacing--9)">

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
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","className":"wolf-hero-collage__stage","style":{"spacing":{"padding":{"top":"var:preset|spacing|10","bottom":"var:preset|spacing|10","right":"0px"}}}} -->
		<div class="wp-block-column is-vertically-aligned-center wolf-hero-collage__stage" style="padding-top:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--10);padding-right:0px">

			<!-- wp:group {"className":"wolf-hero-collage__thumbs","layout":{"type":"default"}} -->
			<div class="wp-block-group wolf-hero-collage__thumbs">

				<!-- wp:image {"className":"wolf-hero-collage__thumb wolf-hero-collage__thumb--1"} -->
				<figure class="wp-block-image wolf-hero-collage__thumb wolf-hero-collage__thumb--1"><img src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/home-collage/aurenza.jpg' ); ?>" alt="Aurenza theme preview"/></figure>
				<!-- /wp:image -->

				<!-- wp:image {"className":"wolf-hero-collage__thumb wolf-hero-collage__thumb--2"} -->
				<figure class="wp-block-image wolf-hero-collage__thumb wolf-hero-collage__thumb--2"><img src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/home-collage/gaintab.jpg' ); ?>" alt="Gaintab theme preview"/></figure>
				<!-- /wp:image -->

				<!-- wp:image {"className":"wolf-hero-collage__thumb wolf-hero-collage__thumb--3"} -->
				<figure class="wp-block-image wolf-hero-collage__thumb wolf-hero-collage__thumb--3"><img src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/home-collage/poize.jpg' ); ?>" alt="Poize theme preview"/></figure>
				<!-- /wp:image -->

				<!-- wp:image {"className":"wolf-hero-collage__thumb wolf-hero-collage__thumb--4"} -->
				<figure class="wp-block-image wolf-hero-collage__thumb wolf-hero-collage__thumb--4"><img src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/home-collage/sable.jpg' ); ?>" alt="Sable theme preview"/></figure>
				<!-- /wp:image -->

				<!-- wp:image {"className":"wolf-hero-collage__thumb wolf-hero-collage__thumb--5"} -->
				<figure class="wp-block-image wolf-hero-collage__thumb wolf-hero-collage__thumb--5"><img src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/home-collage/soundkraft.jpg' ); ?>" alt="Soundkraft theme preview"/></figure>
				<!-- /wp:image -->

			</div>
			<!-- /wp:group -->

		</div>
		<!-- /wp:column -->

	</div>
	<!-- /wp:columns -->

</section>
<!-- /wp:group -->
