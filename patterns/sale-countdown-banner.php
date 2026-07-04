<?php
/**
 * Title: Sale Countdown Banner
 * Slug: seijaku-fse/sale-countdown-banner
 * Categories: banner, call-to-action
 *
 * @package SeijakuFSE
 */

?>

<!-- wp:group {"className":"is-dark wolf-countdown-banner","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|2","bottom":"var:preset|spacing|2"}}},"layout":{"type":"constrained","contentSize":"670px","justifyContent":"center"}} -->
<div class="wp-block-group alignfull is-dark wolf-countdown-banner" style="padding-top:var(--wp--preset--spacing--2);padding-bottom:var(--wp--preset--spacing--2)">
	<!-- wp:columns {"verticalAlignment":"center"} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:paragraph {"align":"center","className":"wolf-countdown-banner__text"} -->
			<p class="has-text-align-center wolf-countdown-banner__text">20% off launch pricing — ends July 15</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:wolf-blocks/countdown {"targetDate":"2026-07-15T23:59:59","expiredText":"Offer has ended","showDays":true,"showSeconds":true} /-->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
