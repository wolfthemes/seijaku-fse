<?php
/**
 * Title: Hero Dark
 * Slug: hero-dark
 * Categories: featured, hero
 */
?>
<!-- wp:cover {"url":"<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero.jpg' ); ?>","dimRatio":70,"minHeight":820,"minHeightUnit":"px","align":"full","className":"wolf-hero-dark"} -->
<div class="wp-block-cover alignfull wolf-hero wolf-hero-dark" style="min-height:820px">
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_theme_file_uri() . '/assets/images/hero.jpg' ); ?>" data-object-fit="cover"/>

	<div class="wp-block-cover__inner-container">

		<!-- wp:group {"layout":{"type":"constrained","contentSize":"var(--wp--style--global--content-size)"}} -->
		<div class="wp-block-group">

			<!-- wp:paragraph {"align":"center","className":"wolf-hero-dark__eyebrow"} -->
			<p class="has-text-align-center wolf-hero-dark__eyebrow">WordPress themes since 2011</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"textAlign":"center","level":1,"className":"wolf-hero-dark__title"} -->
			<h1 class="wp-block-heading has-text-align-center wolf-hero-dark__title">A small studio making themes with the care of a craftsman and the discipline of an engineer.
</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","className":"wolf-hero-dark__text"} -->
			<p class="has-text-align-center wolf-hero-dark__text">Fast, beautiful, and built to last — WordPress themes for musicians, artists, and creative brands.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
			<div class="wp-block-buttons">
				<!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Browse themes</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->

		</div>
		<!-- /wp:group -->

	</div>
</div>
<!-- /wp:cover -->
