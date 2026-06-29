import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin( DrawSVGPlugin );

// Seconds each word stays fully visible.
const DWELL = 2.2;

export default class RotatingWords {
	constructor( { reduced } ) {
		if ( reduced ) {
			return;
		}

		this.el = document.querySelector( '.wolf-rotating-words' );

		if ( ! this.el ) {
			return;
		}

		this.clip = this.el.querySelector( '.wolf-rotating-words__clip' );
		this.inner = this.el.querySelector( '.wolf-rotating-words__inner' );
		this.words = Array.from(
			this.el.querySelectorAll( '.wolf-rotating-word' )
		);
		this.svgs = Array.from( this.el.querySelectorAll( '.wolf-word-svg' ) );
		this.paths = this.svgs.map( ( s ) => s.querySelector( 'path' ) );
		this.current = 0;

		// Clip height = one word's rendered height (text only, no SVG padding).
		// Must run after layout — words are display:block in the inner stack.
		if ( this.clip && this.words[ 0 ] ) {
			this.clip.style.height = this.words[ 0 ].offsetHeight + 'px';
		}

		// All underlines hidden; only word-0 SVG visible.
		gsap.set( this.paths, { drawSVG: '0%' } );
		gsap.set( this.svgs, { opacity: 0 } );
		gsap.set( this.svgs[ 0 ], { opacity: 1 } );

		// Draw in the first underline after page-load animations settle.
		gsap.to( this.paths[ 0 ], {
			drawSVG: '100%',
			duration: 1,
			delay: 1.2,
			ease: 'power2.out',
			onComplete: () => this._scheduleNext(),
		} );
	}

	_scheduleNext() {
		gsap.delayedCall( DWELL, () => this._transition() );
	}

	_transition() {
		const from = this.current;
		const to = ( from + 1 ) % this.words.length;
		const wordH = this.words[ 0 ].offsetHeight;

		const tl = gsap.timeline( {
			onComplete: () => {
				this.current = to;
				this._scheduleNext();
			},
		} );

		// 1. Underline draws out.
		tl.to( this.paths[ from ], {
			drawSVG: '0%',
			duration: 0.5,
			ease: 'power2.in',
		} );

		// 2. Swap visible SVG (instant, mid-slide).
		tl.set( this.svgs[ from ], { opacity: 0 } );
		tl.set( this.svgs[ to ], { opacity: 1 } );

		// 3. Slide the inner stack upward — old word exits top, new enters from below.
		tl.to(
			this.inner,
			{
				y: -( to * wordH ),
				duration: 0.65,
				ease: 'power3.inOut',
			},
			'-=0.35'
		);

		// 4. Draw in the next underline.
		tl.to(
			this.paths[ to ],
			{
				drawSVG: '100%',
				duration: 0.9,
				ease: 'power2.out',
			},
			'-=0.15'
		);
	}
}
