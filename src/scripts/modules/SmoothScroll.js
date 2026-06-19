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

		this.lenis = new Lenis( {
			anchors: true,
			smoothWheel: true,
			stopInertiaOnNavigate: true,
			syncTouch: false,
		} );

		this.lenis.on( 'scroll', ScrollTrigger.update );

		gsap.ticker.add( ( time ) => {
			this.lenis.raf( time * 1000 );
		} );

		gsap.ticker.lagSmoothing( 0 );
	}
}
