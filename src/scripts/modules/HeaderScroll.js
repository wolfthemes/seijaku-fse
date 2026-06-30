const SCROLLED_THRESHOLD = 24;

export default class HeaderScroll {
	constructor( { header } = {} ) {
		this.header = header;

		if ( ! this.header ) {
			return;
		}

		this.ticking = false;

		this.update();
		window.addEventListener( 'scroll', this.onScroll, { passive: true } );
	}

	update = () => {
		this.header.classList.toggle(
			'is-scrolled',
			window.scrollY > SCROLLED_THRESHOLD
		);
		this.ticking = false;
	};

	onScroll = () => {
		if ( this.ticking ) {
			return;
		}

		this.ticking = true;
		window.requestAnimationFrame( this.update );
	};
}
