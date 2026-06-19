<?php
/**
 * Title: Hero — Collage
 * Slug: seijaku-fse/home-hero-collage
 * Categories: hero
 *
 * @package SeijakuFSE
 */

?>
<!-- wp:group {"tagName":"section","align":"full","className":"wolf-hero wolf-hero-collage is-dark has-texture","style":{"dimensions":{"minHeight":"100vh"}},"layout":{"type":"constrained","contentSize":"var(--wp--style--global--wide-size)"}} -->
<section class="wp-block-group alignfull wolf-hero wolf-hero-collage is-dark has-texture" style="min-height:100vh">

	<!-- wp:columns {"verticalAlignment":"center","className":"wolf-hero-collage__inner"} -->
	<div class="wp-block-columns are-vertically-aligned-center wolf-hero-collage__inner">

		<!-- wp:column {"verticalAlignment":"bottom","className":"wolf-hero-collage__content","style":{"spacing":{"padding":{"bottom":"var:preset|spacing|10"}}}} -->
		<div class="wp-block-column is-vertically-aligned-bottom wolf-hero-collage__content" style="padding-bottom:var(--wp--preset--spacing--10)">

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

		<!-- wp:column {"verticalAlignment":"center","className":"wolf-hero-collage__stage"} -->
		<div class="wp-block-column is-vertically-aligned-center wolf-hero-collage__stage">

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
