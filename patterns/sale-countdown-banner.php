<?php
/**
 * Title: Sale Countdown Banner
 * Slug: seijaku-fse/sale-countdown-banner
 * Categories: banner, call-to-action
 *
 * @package SeijakuFSE
 */

?>

<!-- wp:group {"className":"is-dark wolf-countdown-banner","align":"full","layout":{"type":"constrained","contentSize":"var(\u002d\u002dwp\u002d\u002dstyle\u002d\u002dglobal\u002d\u002dcontent-size)","justifyContent":"center"}} -->
<div class="wp-block-group alignfull is-dark wolf-countdown-banner">
	<!-- wp:columns {"verticalAlignment":"center"} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"width":"30%"} -->
		<div class="wp-block-column" style="flex-basis:30%">
			<!-- wp:paragraph {"className":"wolf-countdown-banner__text"} -->
			<p class="wolf-countdown-banner__text">20% off launch pricing — ends July 15</p>
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
