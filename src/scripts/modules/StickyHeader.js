const THRESHOLD = 500;

export default class StickyHeader {
	constructor( { header, lenis = null } = {} ) {
		this.header = header;
		this.lenis = lenis;
		this.isOverlay = this.header?.classList.contains( 'wolf-header-overlay' );

		if ( ! this.header ) {
			return;
		}

		this.update( this.lenis ? this.lenis.animatedScroll : window.scrollY );

		if ( this.lenis ) {
			this.lenis.on( 'scroll', ( { scroll } ) => this.update( scroll ) );
		} else {
			window.addEventListener(
				'scroll',
				() => this.update( window.scrollY ),
				{ passive: true }
			);
		}
	}

	update( y ) {
		const sticky = y > THRESHOLD;
		this.header.classList.toggle( 'is-sticky', sticky );
		document.body.style.paddingTop = sticky && ! this.isOverlay
			? `${ this.header.offsetHeight }px`
			: '';
	}
}
