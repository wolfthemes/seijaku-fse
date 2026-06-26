/**
 * Seijaku FSE — front-end interactions.
 */

import autoBind from 'auto-bind';
import Details from './modules/Details';
import HeroCollage from './modules/HeroCollage';
import SmoothScroll from './modules/SmoothScroll';
import StickyHeader from './modules/StickyHeader';

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
		this.initHeaderOverlayOffset();
		this.initStickyHeader();
		this.initNavCurtain();
		this.initMobileNav();
		// this.initHeroCollage();
		this.initDetails();
	}

	initSmoothScroll() {
		this.smoothScroll = new SmoothScroll( {
			reduced: this.reduced,
		} );
	}

	initStickyHeader() {
		new StickyHeader( {
			header: this.header,
			lenis: this.smoothScroll?.lenis ?? null,
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

	initHeaderOverlayOffset() {
		if (
			! this.header ||
			! this.header.classList.contains( 'wolf-header-overlay' )
		) {
			return;
		}

		this.header.classList.remove( 'is-ready' );
		this.updateHeaderOverlayOffset();

		if ( 'ResizeObserver' in window ) {
			this.headerOverlayResizeObserver = new ResizeObserver(
				this.updateHeaderOverlayOffset
			);

			const marquee = this.header.previousElementSibling;

			if ( marquee ) {
				this.headerOverlayResizeObserver.observe( marquee );
			}
		}

		window.addEventListener( 'resize', this.updateHeaderOverlayOffset, {
			passive: true,
		} );
	}

	updateHeader() {
		this.header.classList.toggle( 'is-scrolled', window.scrollY > 24 );
		this.headerTicking = false;
	}

	updateHeaderOverlayOffset() {
		if (
			! this.header ||
			! this.header.classList.contains( 'wolf-header-overlay' )
		) {
			return;
		}

		const marquee = this.header.previousElementSibling;
		const offset = marquee?.classList.contains( 'wolf-blocks-marquee' )
			? marquee.offsetHeight
			: 0;

		document.documentElement.style.setProperty(
			'--wolf-header-overlay-offset',
			`${ offset }px`
		);
		this.header.classList.add( 'is-ready' );
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

	initMobileNav() {
		this.mobileNavMedia = window.matchMedia( '(max-width: 781.98px)' );
		this.mobileNavContainers = Array.from(
			document.querySelectorAll(
				'.wolf-nav .wp-block-navigation__responsive-container'
			)
		);

		if ( ! this.mobileNavContainers.length ) {
			return;
		}

		this.mobileNavContainers.forEach( ( container ) => {
			container
				.querySelector( '.wp-block-navigation__responsive-dialog' )
				?.setAttribute( 'data-lenis-prevent', '' );
		} );

		this.mobileNavObserver = new MutationObserver(
			this.syncMobileNavState
		);

		this.mobileNavContainers.forEach( ( container ) => {
			this.mobileNavObserver.observe( container, {
				attributes: true,
				attributeFilter: [ 'class' ],
			} );
		} );

		this.mobileNavMedia.addEventListener( 'change', this.syncMobileNavState );
		this.syncMobileNavState();
	}

	syncMobileNavState() {
		if ( ! this.mobileNavContainers?.length ) {
			return;
		}

		const isMobile = this.mobileNavMedia?.matches ?? false;
		const isOpen =
			isMobile &&
			this.mobileNavContainers.some( ( container ) =>
				container.classList.contains( 'is-menu-open' )
			);

		document.documentElement.classList.toggle( 'wolf-nav-open', isOpen );
		document.body.classList.toggle( 'wolf-nav-open', isOpen );

		if ( this.smoothScroll?.lenis ) {
			if ( isOpen ) {
				this.smoothScroll.lenis.stop();
			} else {
				this.smoothScroll.lenis.start();
			}
		}
	}

	initHeroCollage() {
		this.heroCollage = new HeroCollage( {
			reduced: this.reduced,
		} );
	}

	initDetails() {
		this.details = new Details( { reduced: this.reduced } );
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
