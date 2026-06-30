export default class HeaderOverlayOffset {
	constructor( { header } = {} ) {
		this.header = header;

		if ( ! this.header || ! this.header.classList.contains( 'wolf-header-overlay' ) ) {
			return;
		}

		this.header.classList.remove( 'is-ready' );
		this.update();

		if ( 'ResizeObserver' in window ) {
			this.resizeObserver = new ResizeObserver( this.update );

			const marquee = this.header.previousElementSibling;

			if ( marquee ) {
				this.resizeObserver.observe( marquee );
			}
		}

		window.addEventListener( 'resize', this.update, { passive: true } );
	}

	update = () => {
		const marquee = this.header.previousElementSibling;
		const offset = marquee?.classList.contains( 'wolf-blocks-marquee' )
			? marquee.offsetHeight
			: 0;

		document.documentElement.style.setProperty(
			'--wolf-header-overlay-offset',
			`${ offset }px`
		);
		this.header.classList.add( 'is-ready' );
	};
}
