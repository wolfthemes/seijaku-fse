/**
 * Seijaku FSE — front-end interactions.
 */

import autoBind from 'auto-bind';
import Details from './modules/Details';
import HeaderOverlayOffset from './modules/HeaderOverlayOffset';
import HeaderScroll from './modules/HeaderScroll';
import HeroIntro from './modules/HeroIntro';
import MobileNav from './modules/MobileNav';
import NavCurtain from './modules/NavCurtain';
import Reveals from './modules/Reveals';
import RotatingWords from './modules/RotatingWords';
import SignatureReveal from './modules/SignatureReveal';
import SmoothScroll from './modules/SmoothScroll';
import StickyHeader from './modules/StickyHeader';

class SeijakuFse {
	constructor() {
		autoBind( this );

		this.reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		this.header = document.querySelector( '.wolf-header' );

		document.body.classList.add( 'wolf-anim-ready' );

		this.initSmoothScroll();
		this.initReveals();
		this.initHeader();
		this.initHeaderOverlayOffset();
		this.initStickyHeader();
		this.initNavCurtain();
		this.initMobileNav();
		this.initDetails();
		this.initRotatingWords();
		this.initHeroIntro();
		this.initSignatureReveal();
	}

	initSmoothScroll() {
		this.smoothScroll = new SmoothScroll( {
			reduced: this.reduced,
		} );
	}

	initReveals() {
		new Reveals( { reduced: this.reduced } );
	}

	initHeader() {
		new HeaderScroll( { header: this.header } );
	}

	initHeaderOverlayOffset() {
		new HeaderOverlayOffset( { header: this.header } );
	}

	initStickyHeader() {
		new StickyHeader( {
			header: this.header,
			lenis: this.smoothScroll?.lenis ?? null,
		} );
	}

	initNavCurtain() {
		new NavCurtain( { reduced: this.reduced } );
	}

	initMobileNav() {
		this.mobileNav = new MobileNav( {
			lenis: this.smoothScroll?.lenis ?? null,
		} );
	}

	initDetails() {
		this.details = new Details( { reduced: this.reduced } );
	}

	initRotatingWords() {
		this.rotatingWords = new RotatingWords( { reduced: this.reduced } );
	}

	// Title line-split fade-in runs first; rotating words only start cycling
	// once that intro lands, so the two animations don't race each other.
	initHeroIntro() {
		new HeroIntro( {
			reduced: this.reduced,
			onComplete: () => this.rotatingWords?.start(),
		} );
	}

	initSignatureReveal() {
		new SignatureReveal( { reduced: this.reduced } );
	}
}

function boot() {
	new SeijakuFse();
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', boot );
} else {
	boot();
}
