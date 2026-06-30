import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin( DrawSVGPlugin );

const DWELL = 2.2;

// Per-word underline config.
// Two layers per word: layer 0 = ambient/background, layer 1 = main stroke.
// Files live in assets/svg/ and are fetched + injected at runtime so they
// can be refined without touching JS.
const WORD_CONFIG = [
	{
		layers: [
			{
				file: 'underline-musicians-1.svg',
				drawDuration: 0.7,
				drawEase: 'power2.out',
				drawDelay: 0,
				outDuration: 0.3,
			},
			{
				file: 'underline-musicians-2.svg',
				drawDuration: 1.0,
				drawEase: 'power2.out',
				drawDelay: 0.1,
				outDuration: 0.35,
			},
		],
	},
	{
		layers: [
			{
				file: 'underline-artists-1.svg',
				drawDuration: 0.5,
				drawEase: 'power3.out',
				drawDelay: 0,
				outDuration: 0.25,
			},
			{
				file: 'underline-artists-2.svg',
				drawDuration: 0.85,
				drawEase: 'power3.out',
				drawDelay: 0.08,
				outDuration: 0.3,
			},
		],
	},
	{
		layers: [
			{
				file: 'underline-creators-1.svg',
				drawDuration: 0.55,
				drawEase: 'power2.inOut',
				drawDelay: 0,
				outDuration: 0.28,
			},
			{
				file: 'underline-creators-2.svg',
				drawDuration: 0.9,
				drawEase: 'power2.inOut',
				drawDelay: 0.1,
				outDuration: 0.32,
			},
		],
	},
];

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
			this.inner.querySelectorAll( '.wolf-rotating-word' )
		);
		this.count = this.words.length;
		this.current = 0;
		this.textWidths = [];
		this._ready = false;
		this._startPending = false;

		// Hide until start() is called so all stacked words don't flash on load.
		// The intro animation (SplitType) will call start() on its onComplete.
		gsap.set( this.el, { opacity: 0 } );

		const themeUrl =
			window.seijakuFse?.themeUrl?.replace( /\/$/, '' ) || '';

		this._loadAndInit( `${ themeUrl }/assets/svg/` );
	}

	/**
	 * Begin the rotating-words cycle. Called by the hero intro animation's
	 * onComplete so the two sequences are chained. Until that intro is built,
	 * _loadAndInit fires a delayed auto-call — remove that call when wiring up
	 * SplitType and call rotatingWords.start() from the intro timeline instead.
	 */
	start() {
		if ( ! this._ready ) {
			// _loadAndInit hasn't finished yet — flag so it calls start() on ready.
			this._startPending = true;
			return;
		}
		gsap.to( this.el, { opacity: 1, duration: 0.5, ease: 'power2.out' } );
		this._drawIn( 0, 0, () => this._scheduleNext() );
	}

	async _loadAndInit( svgBase ) {
		const allFiles = WORD_CONFIG.flatMap( ( w ) =>
			w.layers.map( ( l ) => l.file )
		);

		let svgTexts;

		try {
			svgTexts = await Promise.all(
				allFiles.map( ( f ) =>
					fetch( `${ svgBase }${ f }` ).then( ( r ) => {
						if ( ! r.ok ) {
							throw new Error( `SVG fetch failed: ${ f }` );
						}
						return r.text();
					} )
				)
			);
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.warn( '[RotatingWords] Could not load SVG underlines.', err );
			return;
		}

		let fileIdx = 0;

		this.wordLayers = this.words.map( ( wordEl, wordIdx ) => {
			const config = WORD_CONFIG[ wordIdx ];
			const wrapper = document.createElement( 'span' );
			wrapper.className = 'wolf-word-underlines';

			// Measure text width BEFORE SVG injection — the word contains only
			// a text node at this point so Range gives the actual glyph width.
			const range = document.createRange();
			range.selectNodeContents( wordEl );
			const textWidth = range.getBoundingClientRect().width;
			this.textWidths.push( textWidth );
			wrapper.style.width = textWidth + 'px';

			const layers = config.layers.map( ( layerCfg, layerIdx ) => {
				const tmp = document.createElement( 'div' );
				// ponytail: innerHTML is safe — same-origin developer-controlled SVGs.
				tmp.innerHTML = svgTexts[ fileIdx++ ]; // eslint-disable-line no-unsanitized/property
				const svg = tmp.querySelector( 'svg' );
				svg.classList.add(
					'wolf-word-svg',
					`wolf-word-svg--${ layerIdx + 1 }`
				);
				svg.setAttribute( 'preserveAspectRatio', 'none' );
				svg.setAttribute( 'aria-hidden', 'true' );
				wrapper.appendChild( svg );

				const path = svg.querySelector( 'path' );
				gsap.set( path, { drawSVG: '0%' } );

				return { path, cfg: layerCfg };
			} );

			wordEl.appendChild( wrapper );
			return layers;
		} );

		await new Promise( ( r ) => requestAnimationFrame( r ) );

		if ( this.clip && this.words[ 0 ] ) {
			const lineH = parseFloat(
				getComputedStyle( this.words[ 0 ] ).lineHeight
			);
			this.clip.style.height = lineH + 'px';
			// Initial clip width = first word's text width.
			this.clip.style.width = this.textWidths[ 0 ] + 'px';
		}

		this._appendClone();

		this._ready = true;

		if ( this._startPending ) {
			// start() was called before we were ready.
			this.start();
		} else {
			// TODO: remove this auto-call once the SplitType hero intro is wired up.
			// Call rotatingWords.start() from the intro timeline's onComplete instead.
			gsap.delayedCall( 1.0, () => this.start() );
		}
	}

	_appendClone() {
		const clone = this.words[ 0 ].cloneNode( true );
		this.inner.appendChild( clone );

		const clonePaths = Array.from( clone.querySelectorAll( 'path' ) );
		clonePaths.forEach( ( p ) => gsap.set( p, { drawSVG: '0%' } ) );

		const cloneLayers = this.wordLayers[ 0 ].map( ( layer, i ) => ( {
			...layer,
			path: clonePaths[ i ],
		} ) );

		this.wordLayers.push( cloneLayers );
		this.words = Array.from(
			this.inner.querySelectorAll( '.wolf-rotating-word' )
		);
	}

	_drawIn( wordIdx, initialDelay = 0, onComplete ) {
		const layers = this.wordLayers[ wordIdx ];
		const tl = gsap.timeline( { delay: initialDelay, onComplete } );

		layers.forEach( ( { path, cfg } ) => {
			tl.to(
				path,
				{
					drawSVG: '100%',
					duration: cfg.drawDuration,
					ease: cfg.drawEase,
				},
				cfg.drawDelay
			);
		} );

		return tl;
	}

	_drawOut( wordIdx ) {
		const layers = this.wordLayers[ wordIdx ];
		const tl = gsap.timeline();

		layers.forEach( ( { path, cfg } ) => {
			tl.to(
				path,
				{ drawSVG: '0%', duration: cfg.outDuration, ease: 'power2.in' },
				0
			);
		} );

		return tl;
	}

	_scheduleNext() {
		gsap.delayedCall( DWELL, () => this._transition() );
	}

	_transition() {
		const from = this.current;
		const to = from + 1;
		const wordH = this.words[ 0 ].offsetHeight;

		const master = gsap.timeline( {
			onComplete: () => {
				if ( to === this.count ) {
					gsap.set( this.inner, { y: 0 } );
					this.wordLayers[ to ].forEach( ( { path } ) =>
						gsap.set( path, { drawSVG: '0%' } )
					);
					this.wordLayers[ 0 ].forEach( ( { path } ) =>
						gsap.set( path, { drawSVG: '100%' } )
					);
					this.current = 0;
				} else {
					this.current = to;
				}

				this._scheduleNext();
			},
		} );

		// 1. Underlines out.
		master.add( this._drawOut( from ), 'start' );

		// 2. Slide inner stack upward.
		master.to(
			this.inner,
			{ y: -( to * wordH ), duration: 0.65, ease: 'power3.inOut' },
			'start+=0.25'
		);

		// 3. Draw in new underlines as slide lands.
		master.add( this._drawIn( to ), 'start+=0.75' );

		return master;
	}
}
