import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default class SmoothScroll {
	constructor( { reduced = false } = {} ) {
		this.reduced = reduced;
		this.lenis = null;
		this.media = window.matchMedia( '(hover: hover) and (pointer: fine)' );

		this.init();
	}

	init() {
		if ( this.reduced || ! this.media.matches ) {
			return;
		}

		gsap.registerPlugin( ScrollTrigger );

		// anchors: false — handled manually below to call preventDefault() and
		// prevent the browser's native instant jump conflicting with Lenis.
		this.lenis = new Lenis( {
			anchors: false,
			smoothWheel: true,
			stopInertiaOnNavigate: true,
			syncTouch: false,
		} );

		this.lenis.on( 'scroll', ScrollTrigger.update );

		gsap.ticker.add( ( time ) => {
			this.lenis.raf( time * 1000 );
		} );

		gsap.ticker.lagSmoothing( 0 );

		document.addEventListener( 'click', this.onAnchorClick );

		// Scroll to a hash already in the URL when the page first loads.
		if ( window.location.hash ) {
			window.addEventListener(
				'load',
				() => {
					this.lenis.scrollTo( window.location.hash );
				},
				{ once: true }
			);
		}
	}

	onAnchorClick = ( event ) => {
		const anchor = event.composedPath().find(
			( node ) => node instanceof HTMLAnchorElement && node.href
		);
		if ( ! anchor ) return;

		const currentUrl = new URL( window.location.href );
		let targetUrl;
		try {
			targetUrl = new URL( anchor.href );
		} catch {
			return;
		}

		if (
			currentUrl.host === targetUrl.host &&
			currentUrl.pathname === targetUrl.pathname &&
			targetUrl.hash
		) {
			event.preventDefault();
			history.pushState( null, '', targetUrl.hash );
			this.lenis.scrollTo( targetUrl.hash );
		}
	};
}
