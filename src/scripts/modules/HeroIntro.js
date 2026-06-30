import gsap from 'gsap';
import SplitType from 'split-type';

// Cap the font-ready wait so a slow/failed font load can't stall the hero
// forever — split-then-animate still looks fine on the fallback font.
const FONT_WAIT_TIMEOUT = 1500;

/**
 * Hero load-in: splits the static title text into lines and fades them up
 * (masked) once webfonts have settled, so there's no FOUT reflow jump.
 * Calls `onComplete` when the intro lands, which the caller uses to kick
 * off RotatingWords so the two sequences are chained, not racing.
 */
export default class HeroIntro {
	constructor( { reduced, onComplete } = {} ) {
		this.onComplete = onComplete || ( () => {} );
		this.hero = document.querySelector( '.wolf-hero' );

		if ( ! this.hero || reduced ) {
			this.onComplete();
			return;
		}

		this._run();
	}

	async _run() {
		try {
			await Promise.race( [
				document.fonts ? document.fonts.ready : Promise.resolve(),
				new Promise( ( resolve ) =>
					setTimeout( resolve, FONT_WAIT_TIMEOUT )
				),
			] );
			this._animate();
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.warn( '[HeroIntro] Falling back to instant reveal.', err );
			this._showInstantly();
			this.onComplete();
		}
	}

	_animate() {
		const titleText = this.hero.querySelector( '.wolf-hero__title-text' );

		if ( ! titleText ) {
			this._showInstantly();
			this.onComplete();
			return;
		}

		const eyebrow = this.hero.querySelector( '.wolf-hero__eyebrow' );
		const rotating = this.hero.querySelector( '.wolf-rotating-words' );
		const tagline = this.hero.querySelector( '.wolf-hero__tagline' );
		const actions = this.hero.querySelector( '.wolf-hero__actions' );

		const split = new SplitType( titleText, {
			types: 'lines',
			tagName: 'span',
		} );

		// Wrap each line in a clipped mask so it slides up from behind an edge
		// instead of just fading in place.
		split.lines.forEach( ( line ) => {
			const mask = document.createElement( 'span' );
			mask.className = 'wolf-hero__title-line-mask';
			line.parentNode.insertBefore( mask, line );
			mask.appendChild( line );
			line.classList.add( 'wolf-hero__title-line' );
		} );

		const lines = titleText.querySelectorAll( '.wolf-hero__title-line' );

		gsap.set( titleText, { opacity: 1 } );
		gsap.set( lines, { yPercent: 110, opacity: 0 } );
		gsap.set( [ eyebrow, rotating, tagline, actions ], {
			opacity: 0,
			y: 14,
		} );

		gsap.timeline( {
			defaults: { ease: 'power3.out' },
			onComplete: this.onComplete,
		} )
			.to( eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0 )
			.to(
				lines,
				{
					yPercent: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.12,
					ease: 'power4.out',
				},
				0.15
			)
			.to( rotating, { opacity: 1, y: 0, duration: 0.6 }, '>-0.4' )
			.to( tagline, { opacity: 1, y: 0, duration: 0.5 }, '<0.05' )
			.to( actions, { opacity: 1, y: 0, duration: 0.5 }, '<0.05' );
	}

	_showInstantly() {
		gsap.set(
			this.hero.querySelectorAll(
				'.wolf-hero__eyebrow, .wolf-hero__title-text, .wolf-rotating-words, .wolf-hero__tagline, .wolf-hero__actions'
			),
			{ clearProps: 'all' }
		);
	}
}
