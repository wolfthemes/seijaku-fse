import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { inlineSvg } from './InlineSvg';

gsap.registerPlugin( ScrollTrigger, DrawSVGPlugin );

// Signature writing animation using DrawSVG.
//
// The signature SVG is a filled-path trace (imagetracer.js), so DrawSVG runs
// on the stroke of each path. Fills are hidden during animation, then faded
// back in on complete so the final look matches the original artwork.

const TOTAL_DURATION = 2.0; // seconds — full signature at pen speed
const STROKE_WIDTH = 15; // SVG units; adjust if stroke weight looks off at 120px display

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

		// Read dimensions from viewBox (InlineSvg strips width/height attrs).
		const vb = svg.viewBox?.baseVal;
		// (vb available but unused here — paths use getTotalLength for timing)

		// Only the visible paths (skip fully-transparent background filler paths).
		const paths = Array.from( svg.querySelectorAll( 'path' ) ).filter( ( p ) => {
			const opacity = parseFloat( p.getAttribute( 'opacity' ) ?? 1 );
			return opacity > 0;
		} );

		if ( this.reduced ) {
			return;
		}

		// Snapshot original presentation so we can restore it after animation.
		const origProps = paths.map( ( p ) => ( {
			fill: p.getAttribute( 'fill' ),
			stroke: p.getAttribute( 'stroke' ),
			strokeWidth: p.getAttribute( 'stroke-width' ),
			opacity: p.getAttribute( 'opacity' ),
		} ) );

		// Switch to stroke-only for the drawing phase.
		paths.forEach( ( p ) => {
			p.setAttribute( 'fill', 'none' );
			p.setAttribute( 'stroke', 'currentColor' );
			p.setAttribute( 'stroke-width', STROKE_WIDTH );
			p.setAttribute( 'stroke-linecap', 'round' );
			p.setAttribute( 'stroke-linejoin', 'round' );
			p.removeAttribute( 'opacity' ); // opacity is on the element; stroke inherits it
		} );

		gsap.set( paths, { drawSVG: '0%', opacity: 0 } );

		// Per-path duration proportional to path length → consistent pen speed.
		const lengths = paths.map( ( p ) => p.getTotalLength() || 1 );
		const totalLength = lengths.reduce( ( s, l ) => s + l, 0 );

		const tl = gsap.timeline( {
			scrollTrigger: {
				trigger: svg,
				start: 'top 80%',
				once: true,
			},
			onComplete: () => restore( paths, origProps ),
		} );

		// Sequence each path end-to-end (position = cumulative time so far).
		let cursor = 0;
		paths.forEach( ( path, i ) => {
			const dur = Math.max(
				( lengths[ i ] / totalLength ) * TOTAL_DURATION,
				0.04
			);
			tl.to(
				path,
				{ drawSVG: '100%', opacity: 1, duration: dur, ease: 'none' },
				cursor
			);
			// ponytail: slight overlap between consecutive strokes feels like continuous pen lift
			cursor += dur * 0.6;
		} );
	}
}

function restore( paths, origProps ) {
	// Cross-fade back to original filled artwork.
	const tl = gsap.timeline();
	tl.to( paths, { opacity: 0, duration: 0.15, ease: 'power1.in' } ).call(
		() => {
			paths.forEach( ( p, i ) => {
				const o = origProps[ i ];
				if ( o.fill ) p.setAttribute( 'fill', o.fill );
				else p.removeAttribute( 'fill' );
				if ( o.stroke ) p.setAttribute( 'stroke', o.stroke );
				else p.removeAttribute( 'stroke' );
				if ( o.strokeWidth )
					p.setAttribute( 'stroke-width', o.strokeWidth );
				else p.removeAttribute( 'stroke-width' );
				p.removeAttribute( 'stroke-linecap' );
				p.removeAttribute( 'stroke-linejoin' );
				if ( o.opacity ) p.setAttribute( 'opacity', o.opacity );
				else p.removeAttribute( 'opacity' );
				gsap.set( p, { clearProps: 'drawSVG,opacity' } );
			} );
		}
	).to( paths, { opacity: 1, duration: 0.25, ease: 'power1.out' } );
}
