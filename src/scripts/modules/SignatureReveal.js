import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { inlineSvg } from './InlineSvg';

gsap.registerPlugin( ScrollTrigger, DrawSVGPlugin );

const TOTAL_DURATION = 2; // seconds for the full signature

export default class SignatureReveal {
	constructor( { reduced = false } = {} ) {
		this.reduced = reduced;
		this.init();
	}

	async init() {
		const svgs = await inlineSvg( '.wolf-signature img[src$=".svg"]' );
		const svg = svgs[ 0 ];
		if ( ! svg ) {
			return;
		}

		const paths = Array.from( svg.querySelectorAll( 'path' ) );
		if ( ! paths.length ) {
			return;
		}

		// Always reveal wrapper once SVG is ready — even in reduced mode.
		svg.parentElement.style.opacity = '1';

		if ( this.reduced ) {
			return;
		}

		gsap.set( paths, { drawSVG: '0%' } );

		// Per-path duration proportional to path length → consistent pen speed.
		const lengths = paths.map( ( p ) => p.getTotalLength() || 1 );
		const totalLength = lengths.reduce( ( s, l ) => s + l, 0 );

		const tl = gsap.timeline( {
			scrollTrigger: {
				trigger: svg,
				start: 'top 80%',
				once: true,
				// Fallback: if trigger never fires (section already visible on load),
				// ScrollTrigger will call onEnter immediately.
			},
		} );

		let cursor = 0;
		paths.forEach( ( path, i ) => {
			const dur = Math.max(
				( lengths[ i ] / totalLength ) * TOTAL_DURATION,
				0.05
			);
			tl.to(
				path,
				{ drawSVG: '100%', duration: dur, ease: 'none' },
				cursor
			);
			cursor += dur;
		} );
	}
}
