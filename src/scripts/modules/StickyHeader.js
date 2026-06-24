const THRESHOLD = 500;

export default class StickyHeader {
	constructor( { header, lenis = null } = {} ) {
		this.header = header;
		this.lenis = lenis;

		if ( ! this.header ) {
			return;
		}

		if ( this.lenis ) {
			this.lenis.on( 'scroll', ( { scroll } ) => this.update( scroll ) );
		} else {
			window.addEventListener( 'scroll', () => this.update( window.scrollY ), { passive: true } );
		}
	}

	update( y ) {
		const sticky = y > THRESHOLD;
		this.header.classList.toggle( 'is-sticky', sticky );
		document.body.style.paddingTop = sticky
			? `${ this.header.offsetHeight }px`
			: '';
	}
}
