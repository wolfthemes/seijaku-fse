import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin( DrawSVGPlugin );

const DWELL = 0.8;

// Per-word underline config.
// animationType 'draw'   → DrawSVG stroke animation (default).
// animationType 'reveal' → clipPath left-to-right reveal; use for filled SVGs
//                          like paintline.svg where DrawSVG has nothing to animate.
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
				file: 'paintline.svg',
				animationType: 'reveal',
				drawDuration: 0.75,
				drawEase: 'power3.inOut',
				drawDelay: 0,
				outDuration: 0.35,
			},
		],
	},
	{
		layers: [
			{
				file: 'underline-creators.svg',
				drawDuration: 0.9,
				drawEase: 'power3.out',
				drawDelay: 0,
				outDuration: 0.35,
			},
		],
	},
];

// Clip values for reveal animation: hidden = right side fully clipped, shown = unclipped.
const CLIP_HIDDEN = 'inset(0 100% 0 0)';
const CLIP_SHOWN = 'inset(0 0% 0 0)';

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

		const themeUrl =
			window.seijakuFse?.themeUrl?.replace( /\/$/, '' ) || '';

		this._loadAndInit( `${ themeUrl }/assets/svg/` );
	}

	/**
	 * Begin the rotating-words cycle. Called by HeroIntro's onComplete so
	 * the title fade-in and the rotation are chained, not racing.
	 */
	start() {
		if ( ! this._ready ) {
			// _loadAndInit hasn't finished yet — flag so it calls start() on ready.
			this._startPending = true;
			return;
		}
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
			console.warn(
				'[RotatingWords] Could not load SVG underlines.',
				err
			);
			return;
		}

		let fileIdx = 0;

		this.wordLayers = this.words.map( ( wordEl, wordIdx ) => {
			const config = WORD_CONFIG[ wordIdx ];
			const wrapper = document.createElement( 'span' );
			// Modifier class per word index lets each underline's vertical
			// offset be tuned independently in CSS (e.g. Musicians sits lower).
			wrapper.className = `wolf-word-underlines wolf-word-underlines--${ wordIdx }`;

			// Measure text width BEFORE SVG injection — the word contains only
			// a text node at this point so Range gives the actual glyph width.
			// Keep the text node reference so resize can re-measure it later
			// (the hero font-size is fluid/clamped, so width shifts on resize).
			const textNode = wordEl.firstChild;
			this.textNodes = this.textNodes || [];
			this.textNodes.push( textNode );

			const range = document.createRange();
			range.selectNodeContents( wordEl );
			const textWidth = range.getBoundingClientRect().width;
			this.textWidths.push( textWidth );
			wrapper.style.width = textWidth + 'px';

			const layers = config.layers.map( ( layerCfg, layerIdx ) => {
				const tmp = document.createElement( 'div' );
				// ponytail: innerHTML is safe — same-origin developer-controlled SVGs.
				tmp.innerHTML = svgTexts[ fileIdx++ ]; // eslint-disable-line
				const svg = tmp.querySelector( 'svg' );
				svg.classList.add(
					'wolf-word-svg',
					`wolf-word-svg--${ layerIdx + 1 }`
				);
				svg.setAttribute( 'aria-hidden', 'true' );
				wrapper.appendChild( svg );

				if ( layerCfg.animationType === 'reveal' ) {
					// Reveal mode: animate the SVG element itself with clipPath.
					// Preserve the SVG's natural aspect ratio so the artwork isn't
					// squashed — compute height from viewBox proportions + text width.
					const vbAttr = svg.getAttribute( 'viewBox' );
					if ( vbAttr ) {
						const parts = vbAttr
							.trim()
							.split( /[\s,]+/ )
							.map( Number );
						const vbW = parts[ 2 ];
						const vbH = parts[ 3 ];
						if ( vbW > 0 ) {
							svg.style.height = textWidth * ( vbH / vbW ) + 'px';
						}
					}
					svg.classList.add( 'wolf-word-svg--reveal' );
					gsap.set( svg, { clipPath: CLIP_HIDDEN } );
					return { paths: [], el: svg, cfg: layerCfg };
				}

				// Draw mode: DrawSVG on all paths in the SVG.
				svg.setAttribute( 'preserveAspectRatio', 'none' );
				const paths = Array.from( svg.querySelectorAll( 'path' ) );
				paths.forEach( ( p ) => gsap.set( p, { drawSVG: '0%' } ) );
				return { paths, el: null, cfg: layerCfg };
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
			this.clip.classList.add( 'wolf-rotating-words__clip--active' );
		}

		this._appendClone();

		// Hero title font-size is fluid (clamps with viewport width), so the
		// clip height and underline geometry measured above go stale on
		// resize. Recompute them (debounced) instead of leaving them frozen.
		window.addEventListener(
			'resize',
			() => {
				clearTimeout( this._resizeTimer );
				this._resizeTimer = setTimeout(
					() => this._recalcGeometry(),
					150
				);
			},
			{ passive: true }
		);

		this._ready = true;

		if ( this._startPending ) {
			// start() was called before we were ready — HeroIntro's onComplete.
			this.start();
		}
	}

	_recalcGeometry() {
		if ( ! this.clip || ! this.words[ 0 ] ) {
			return;
		}

		const lineH = parseFloat(
			getComputedStyle( this.words[ 0 ] ).lineHeight
		);
		this.clip.style.height = lineH + 'px';

		this.words.forEach( ( wordEl, idx ) => {
			const textNode = this.textNodes[ idx ];
			const wrapper = wordEl.querySelector( '.wolf-word-underlines' );
			if ( ! textNode || ! wrapper ) {
				return;
			}

			const range = document.createRange();
			range.selectNodeContents( textNode );
			const textWidth = range.getBoundingClientRect().width;
			wrapper.style.width = textWidth + 'px';

			this.wordLayers[ idx ].forEach( ( { el, cfg } ) => {
				if ( cfg.animationType !== 'reveal' || ! el ) {
					return;
				}
				const vbAttr = el.getAttribute( 'viewBox' );
				if ( ! vbAttr ) {
					return;
				}
				const parts = vbAttr
					.trim()
					.split( /[\s,]+/ )
					.map( Number );
				const [ , , vbW, vbH ] = parts;
				if ( vbW > 0 ) {
					el.style.height = textWidth * ( vbH / vbW ) + 'px';
				}
			} );
		} );

		// Keep the slide stack aligned with the (possibly resized) word height.
		const wordH = this.words[ 0 ].getBoundingClientRect().height;
		gsap.set( this.inner, { y: -( this.current * wordH ) } );
	}

	_appendClone() {
		const clone = this.words[ 0 ].cloneNode( true );
		this.inner.appendChild( clone );
		this.textNodes.push( clone.firstChild );

		// Reset clone SVGs according to each layer's animation type.
		const cloneSvgs = Array.from(
			clone.querySelectorAll( '.wolf-word-svg' )
		);

		const clonePaths = Array.from( clone.querySelectorAll( 'path' ) );
		let pathIdx = 0;

		const cloneLayers = this.wordLayers[ 0 ].map( ( layer, layerIdx ) => {
			const cloneSvg = cloneSvgs[ layerIdx ];

			if ( layer.cfg.animationType === 'reveal' ) {
				gsap.set( cloneSvg, { clipPath: CLIP_HIDDEN } );
				return { paths: [], el: cloneSvg, cfg: layer.cfg };
			}

			const count = layer.paths.length;
			const paths = clonePaths.slice( pathIdx, pathIdx + count );
			pathIdx += count;
			paths.forEach( ( p ) => gsap.set( p, { drawSVG: '0%' } ) );
			return { paths, el: null, cfg: layer.cfg };
		} );

		this.wordLayers.push( cloneLayers );
		this.words = Array.from(
			this.inner.querySelectorAll( '.wolf-rotating-word' )
		);
	}

	_drawIn( wordIdx, initialDelay = 0, onComplete ) {
		const layers = this.wordLayers[ wordIdx ];
		const tl = gsap.timeline( { delay: initialDelay, onComplete } );

		layers.forEach( ( { paths, el, cfg } ) => {
			if ( cfg.animationType === 'reveal' ) {
				tl.to(
					el,
					{
						clipPath: CLIP_SHOWN,
						duration: cfg.drawDuration,
						ease: cfg.drawEase,
					},
					cfg.drawDelay
				);
			} else {
				tl.to(
					paths,
					{
						drawSVG: '100%',
						duration: cfg.drawDuration,
						ease: cfg.drawEase,
					},
					cfg.drawDelay
				);
			}
		} );

		return tl;
	}

	_drawOut( wordIdx ) {
		const layers = this.wordLayers[ wordIdx ];
		const tl = gsap.timeline();

		layers.forEach( ( { paths, el, cfg } ) => {
			if ( cfg.animationType === 'reveal' ) {
				tl.to(
					el,
					{
						clipPath: CLIP_HIDDEN,
						duration: cfg.outDuration,
						ease: 'power2.in',
					},
					0
				);
			} else {
				tl.to(
					paths,
					{
						drawSVG: '0%',
						duration: cfg.outDuration,
						ease: 'power2.in',
					},
					0
				);
			}
		} );

		return tl;
	}

	_scheduleNext() {
		gsap.delayedCall( DWELL, () => this._transition() );
	}

	_transition() {
		if ( this._pendingReset ) {
			gsap.set( this.inner, { y: 0 } );

			this.wordLayers[ this.count ].forEach( ( { paths, el, cfg } ) => {
				if ( cfg.animationType === 'reveal' ) {
					gsap.set( el, { clipPath: CLIP_HIDDEN } );
				} else {
					gsap.set( paths, { drawSVG: '0%' } );
				}
			} );

			this.wordLayers[ 0 ].forEach( ( { paths, el, cfg } ) => {
				if ( cfg.animationType === 'reveal' ) {
					gsap.set( el, { clipPath: CLIP_SHOWN } );
				} else {
					gsap.set( paths, { drawSVG: '100%' } );
				}
			} );

			this._pendingReset = false;
		}

		const from = this.current;
		const to = from + 1;
		const wordH = this.words[ 0 ].getBoundingClientRect().height;

		const master = gsap.timeline( {
			onComplete: () => {
				if ( to === this.count ) {
					this.current = 0;
					this._pendingReset = true;
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
