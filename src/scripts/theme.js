/**
 * Seijaku FSE — front-end interactions.
 *
 * Dependency-free and deliberately small (this is a product-selling site,
 * not a showreel). Two jobs:
 *   1. Scroll-reveal sections as they enter the viewport.
 *   2. Condense the sticky header once the page is scrolled.
 *
 * Progressive enhancement: the reveal CSS only hides content once we've
 * flagged the body with `wolf-anim-ready`, so a failed/blocked script can
 * never leave the page invisible. prefers-reduced-motion is respected.
 */

/**
 * Wire up scroll reveals for `.wolf-reveal` / `.wolf-reveal-group` elements.
 *
 * @param {boolean} reduced Whether the user prefers reduced motion.
 */
function initReveals( reduced ) {
	const targets = document.querySelectorAll(
		'.wolf-reveal, .wolf-reveal-group'
	);

	if ( ! targets.length ) {
		return;
	}

	// No IntersectionObserver (or reduced motion): just show everything.
	if ( reduced || ! ( 'IntersectionObserver' in window ) ) {
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
				obs.unobserve( entry.target ); // reveal once, then forget.
			} );
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
	);

	targets.forEach( ( el ) => observer.observe( el ) );
}

/**
 * Toggle the condensed state on the sticky header past a small scroll
 * threshold, throttled to one update per animation frame.
 */
function initHeader() {
	const header = document.querySelector( '.wolf-header' );

	if ( ! header ) {
		return;
	}

	let ticking = false;

	const update = () => {
		header.classList.toggle( 'is-scrolled', window.scrollY > 24 );
		ticking = false;
	};

	const onScroll = () => {
		if ( ticking ) {
			return;
		}
		ticking = true;
		window.requestAnimationFrame( update );
	};

	update(); // set correct state on load (e.g. refresh mid-page).
	window.addEventListener( 'scroll', onScroll, { passive: true } );
}

/**
 * Curtain-roll hover effect for desktop nav items.
 *
 * Appends an aria-hidden clone of each label text so the CSS can
 * translate both out/in simultaneously. Skipped under reduced motion
 * (CSS falls back to a plain opacity fade in that case).
 *
 * @param {boolean} reduced Whether the user prefers reduced motion.
 */
function initNavCurtain( reduced ) {
	if ( reduced ) {
		return;
	}

	document
		.querySelectorAll( '.wolf-nav .wp-block-navigation-item__label' )
		.forEach( ( label ) => {
			const clone = document.createElement( 'span' );
			clone.className = 'wolf-nav-curtain';
			clone.textContent = label.textContent;
			clone.setAttribute( 'aria-hidden', 'true' );
			label.closest( '.wp-block-navigation-item__content' ).appendChild( clone );
		} );
}

function init() {
	const reduced = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	// Signal to the CSS that JS-driven reveals are safe to hide initially.
	document.body.classList.add( 'wolf-anim-ready' );

	initReveals( reduced );
	initHeader();
	initNavCurtain( reduced );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
