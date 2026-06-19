/**
 * Seijaku FSE — front-end interactions.
 */

import autoBind from 'auto-bind';
import HeroCollage from './modules/HeroCollage';
import SmoothScroll from './modules/SmoothScroll';

class SeijakuFse {
	constructor() {
		autoBind( this );

		this.reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		this.header = document.querySelector( '.wolf-header' );
		this.headerTicking = false;

		document.body.classList.add( 'wolf-anim-ready' );

		this.initSmoothScroll();
		this.initReveals();
		this.initHeader();
		this.initNavCurtain();
		this.initHeroCollage();
	}

	initSmoothScroll() {
		this.smoothScroll = new SmoothScroll( {
			reduced: this.reduced,
		} );
	}

	initReveals() {
		const targets = document.querySelectorAll(
			'.wolf-reveal, .wolf-reveal-group'
		);

		if ( ! targets.length ) {
			return;
		}

		if ( this.reduced || ! ( 'IntersectionObserver' in window ) ) {
			targets.forEach( ( el ) => el.classList.add( 'is-inview' ) );
			return;
		}

		const observer = new IntersectionObserver(
			( entries, obs ) => {
				entries.forEach( ( entry ) => {
					if ( ! entry.isIntersecting ) {
						return;
					}

					entry.target.classList.add( 'is-inview' );
					obs.unobserve( entry.target );
				} );
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
		);

		targets.forEach( ( el ) => observer.observe( el ) );
	}

	initHeader() {
		if ( ! this.header ) {
			return;
		}

		this.updateHeader();
		window.addEventListener( 'scroll', this.onHeaderScroll, {
			passive: true,
		} );
	}

	updateHeader() {
		this.header.classList.toggle( 'is-scrolled', window.scrollY > 24 );
		this.headerTicking = false;
	}

	onHeaderScroll() {
		if ( this.headerTicking ) {
			return;
		}

		this.headerTicking = true;
		window.requestAnimationFrame( this.updateHeader );
	}

	initNavCurtain() {
		if ( this.reduced ) {
			return;
		}

		document
			.querySelectorAll( '.wolf-nav .wp-block-navigation-item__label' )
			.forEach( ( label ) => {
				const clone = document.createElement( 'span' );
				clone.className = 'wolf-nav-curtain';
				clone.textContent = label.textContent;
				clone.setAttribute( 'aria-hidden', 'true' );
				label
					.closest( '.wp-block-navigation-item__content' )
					.appendChild( clone );
			} );
	}

	initHeroCollage() {
		this.heroCollage = new HeroCollage( {
			reduced: this.reduced,
		} );
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
