import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin( DrawSVGPlugin );

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

		// Original word count before cloning.
		this.count = this.words.length;
		this.current = 0;

		// Clone first word + SVG and append to the end so the carousel can
		// slide forward through Musicians → Artists → Creators → Musicians
		// without ever reversing.
		this._appendClone();

		// Set clip height to one word's rendered line height.
		if ( this.clip && this.words[ 0 ] ) {
			this.clip.style.height = this.words[ 0 ].offsetHeight + 'px';
		}

		// All underlines invisible; word-0 SVG ready to draw.
		gsap.set( this.paths, { drawSVG: '0%' } );
		gsap.set( this.svgs, { opacity: 0 } );
		gsap.set( this.svgs[ 0 ], { opacity: 1 } );

		// Draw in the first underline after page load settles.
		gsap.to( this.paths[ 0 ], {
			drawSVG: '100%',
			duration: 1,
			delay: 1.2,
			ease: 'power2.out',
			onComplete: () => this._scheduleNext(),
		} );
	}

	_appendClone() {
		// Clone word[0] into the inner stack.
		const wordClone = this.words[ 0 ].cloneNode( true );
		this.inner.appendChild( wordClone );

		// Clone svg[0] as a sibling of the other SVGs.
		const svgClone = this.svgs[ 0 ].cloneNode( true );
		this.el.appendChild( svgClone );

		// Refresh node lists to include the clones.
		this.words = Array.from(
			this.el.querySelectorAll( '.wolf-rotating-word' )
		);
		this.svgs = Array.from( this.el.querySelectorAll( '.wolf-word-svg' ) );
		this.paths = this.svgs.map( ( s ) => s.querySelector( 'path' ) );

		// Clone starts hidden.
		gsap.set( this.svgs[ this.count ], { opacity: 0 } );
		gsap.set( this.paths[ this.count ], { drawSVG: '0%' } );
	}

	_scheduleNext() {
		gsap.delayedCall( DWELL, () => this._transition() );
	}

	_transition() {
		const from = this.current;
		const to = from + 1; // always slide forward
		const wordH = this.words[ 0 ].offsetHeight;

		const tl = gsap.timeline( {
			onComplete: () => {
				if ( to === this.count ) {
					// We just showed the clone (Musicians again). Snap back to the
					// real word-0 position instantly — no visible jump because the
					// clone and word-0 look identical.
					gsap.set( this.inner, { y: 0 } );
					gsap.set( this.svgs[ to ], { opacity: 0 } );
					gsap.set( this.paths[ to ], { drawSVG: '0%' } );
					gsap.set( this.svgs[ 0 ], { opacity: 1 } );
					gsap.set( this.paths[ 0 ], { drawSVG: '100%' } );
					this.current = 0;
				} else {
					this.current = to;
				}

				this._scheduleNext();
			},
		} );

		// 1. Reverse the outgoing underline.
		tl.to( this.paths[ from ], {
			drawSVG: '0%',
			duration: 0.5,
			ease: 'power2.in',
		} );

		// 2. Swap which SVG is visible (instant, mid-slide).
		tl.set( this.svgs[ from ], { opacity: 0 } );
		tl.set( this.svgs[ to ], { opacity: 1 } );

		// 3. Slide inner upward — old word exits top, new enters from below.
		tl.to(
			this.inner,
			{
				y: -( to * wordH ),
				duration: 0.65,
				ease: 'power3.inOut',
			},
			'-=0.35'
		);

		// 4. Draw in the incoming underline.
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
