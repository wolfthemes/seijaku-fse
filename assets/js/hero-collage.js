/**
 * Hero-collage animations — GSAP-powered.
 *
 * Three layers:
 *   1. Page-load stagger reveal (one by one, bottom-up).
 *   2. ScrollTrigger parallax (each thumb at a different depth).
 *   3. Mouse-move parallax (depth-keyed tilt + translate).
 */
( function () {
	'use strict';

	const reduced = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function init() {
		const stage  = document.querySelector( '.wolf-hero-collage__stage' );
		const thumbs = document.querySelectorAll( '.wolf-hero-collage__thumb' );

		if ( ! stage || ! thumbs.length ) {
			return;
		}

		if ( typeof gsap === 'undefined' ) {
			return;
		}

		// Depth multipliers per thumb (scroll + mouse parallax).
		// Higher = more movement.
		const depths = [ 0.18, 0.10, 0.25, 0.14, 0.20, 0.16, 0.12, 0.09 ];

		// ── 1. Page-load stagger ─────────────────────────────────────────
		if ( reduced ) {
			gsap.set( thumbs, { opacity: 1 } );
			initScrollParallax();
			return;
		}

		gsap.set( thumbs, { opacity: 0, y: 48, scale: 0.96 } );

		gsap.to( thumbs, {
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.85,
			ease: 'power3.out',
			stagger: 0.14,
			delay: 0.2,
			clearProps: 'scale,y', // reset inline transform so ScrollTrigger starts clean
			onComplete: initScrollParallax,
		} );

		// ── 2. Scroll parallax (ScrollTrigger) ──────────────────────────
		// Initialised only after entrance ends to avoid a snap-to-scroll-position jump.
		function initScrollParallax() {
			if ( typeof ScrollTrigger === 'undefined' ) {
				return;
			}

			gsap.registerPlugin( ScrollTrigger );

			thumbs.forEach( ( thumb, i ) => {
				const travel = depths[ i ] * 260; // px travel over the scroll range
				gsap.to( thumb, {
					y: -travel,
					ease: 'none',
					scrollTrigger: {
						trigger: stage,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1.4,
					},
				} );
			} );
		}

		// ── 3. Mouse-move parallax ───────────────────────────────────────
		let mouseX = 0;
		let mouseY = 0;
		let rafId  = null;

		const applyMouseParallax = () => {
			thumbs.forEach( ( thumb, i ) => {
				const d  = depths[ i ];
				const tx = mouseX * d * 28;
				const ty = mouseY * d * 18;
				gsap.to( thumb, {
					x: tx,
					y: ty,
					duration: 1.1,
					ease: 'power2.out',
					overwrite: 'auto',
				} );
			} );
			rafId = null;
		};

		stage.addEventListener( 'mousemove', ( e ) => {
			const rect = stage.getBoundingClientRect();
			// Normalise to -1 … +1 from center
			mouseX = ( ( e.clientX - rect.left ) / rect.width  - 0.5 ) * 2;
			mouseY = ( ( e.clientY - rect.top  ) / rect.height - 0.5 ) * 2;

			if ( ! rafId ) {
				rafId = window.requestAnimationFrame( applyMouseParallax );
			}
		} );

		stage.addEventListener( 'mouseleave', () => {
			mouseX = 0;
			mouseY = 0;
			thumbs.forEach( ( thumb ) => {
				gsap.to( thumb, { x: 0, y: 0, duration: 1.2, ease: 'power2.out', overwrite: 'auto' } );
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
