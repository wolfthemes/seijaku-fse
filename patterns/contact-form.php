<?php
/**
 * Title: Contact Form
 * Slug: seijaku-fse/contact-form
 * Description: A narrow placeholder section for a contact form shortcode.
 * Categories: contact, text
 *
 * @package SeijakuFSE
 */

?>

<!-- wp:group {"tagName":"section","metadata":{"name":"Contact form"},"anchor":"contact-form","className":"wolf-section-pad\u002d\u002dbig","align":"full","layout":{"type":"constrained","contentSize":"760px"}} -->
<section id="contact-form" class="wp-block-group alignfull wolf-section-pad--big">
	<!-- wp:heading {"level":2,"textAlign":"center"} -->
	<h2 class="wp-block-heading has-text-align-center">Send a message</h2>
	<!-- /wp:heading -->
	<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|6"}}}} -->
	<p class="has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--6)">Fill the form below and I will get back to you shortly</p>
	<!-- /wp:paragraph -->
	<!-- wp:shortcode -->
	[contact-form-7 id="CONTACT_FORM_ID"]
	<!-- /wp:shortcode -->
</section>
<!-- /wp:group -->
