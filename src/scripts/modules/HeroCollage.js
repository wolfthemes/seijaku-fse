import autoBind from 'auto-bind';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default class HeroCollage {
	constructor( { reduced = false } = {} ) {
		autoBind( this );

		this.reduced = reduced;
		this.stage = document.querySelector( '.wolf-hero-collage__stage' );
		this.thumbs = document.querySelectorAll( '.wolf-hero-collage__thumb' );
		this.textLines = document.querySelectorAll(
			'.wolf-hero-collage__text-line'
		);
		this.depths = [ 0.18, 0.1, 0.25, 0.14, 0.2, 0.16, 0.12, 0.09 ];
		this.mouseX = 0;
		this.mouseY = 0;
		this.rafId = null;

		this.init();
	}

	init() {
		if ( ! this.stage || ! this.thumbs.length ) {
			return;
		}

		if ( typeof gsap === 'undefined' ) {
			return;
		}

		this.initEntrance();
		this.initMouseParallax();
	}

	initEntrance() {
		if ( this.reduced ) {
			gsap.set( [ ...this.thumbs, ...this.textLines ], { opacity: 1 } );
			this.initScrollParallax();
			return;
		}

		gsap.set( this.thumbs, { opacity: 0, y: 48, scale: 0.96 } );
		gsap.set( this.textLines, { opacity: 0, y: 22 } );

		gsap.timeline( { delay: 0.2, onComplete: this.initScrollParallax } )
			.to( this.textLines, {
				opacity: 1,
				y: 0,
				duration: 0.72,
				ease: 'power3.out',
				stagger: 0.16,
				clearProps: 'y',
			} )
			.to(
				this.thumbs,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.85,
					ease: 'power3.out',
					stagger: 0.14,
					clearProps: 'scale,y',
				},
				'-=0.18'
			);
	}

	initScrollParallax() {
		if ( typeof ScrollTrigger === 'undefined' ) {
			return;
		}

		gsap.registerPlugin( ScrollTrigger );

		this.thumbs.forEach( ( thumb, i ) => {
			const travel = this.depths[ i ] * 260;

			gsap.to( thumb, {
				y: -travel,
				ease: 'none',
				scrollTrigger: {
					trigger: this.stage,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1.4,
				},
			} );
		} );
	}

	initMouseParallax() {
		this.stage.addEventListener( 'mousemove', this.onMouseMove );
		this.stage.addEventListener( 'mouseleave', this.onMouseLeave );
	}

	onMouseMove( e ) {
		const rect = this.stage.getBoundingClientRect();

		this.mouseX = ( ( e.clientX - rect.left ) / rect.width - 0.5 ) * 2;
		this.mouseY = ( ( e.clientY - rect.top ) / rect.height - 0.5 ) * 2;

		if ( ! this.rafId ) {
			this.rafId = window.requestAnimationFrame(
				this.applyMouseParallax
			);
		}
	}

	applyMouseParallax() {
		this.thumbs.forEach( ( thumb, i ) => {
			const d = this.depths[ i ];

			gsap.to( thumb, {
				x: this.mouseX * d * 28,
				y: this.mouseY * d * 18,
				duration: 1.1,
				ease: 'power2.out',
				overwrite: 'auto',
			} );
		} );

		this.rafId = null;
	}

	onMouseLeave() {
		this.mouseX = 0;
		this.mouseY = 0;

		this.thumbs.forEach( ( thumb ) => {
			gsap.to( thumb, {
				x: 0,
				y: 0,
				duration: 1.2,
				ease: 'power2.out',
				overwrite: 'auto',
			} );
		} );
	}
}
