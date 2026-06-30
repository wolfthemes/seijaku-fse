export default class MobileNav {
	constructor( { lenis = null } = {} ) {
		this.lenis = lenis;
		this.media = window.matchMedia( '(max-width: 781.98px)' );
		this.containers = Array.from(
			document.querySelectorAll(
				'.wolf-nav .wp-block-navigation__responsive-container'
			)
		);

		if ( ! this.containers.length ) {
			return;
		}

		this.containers.forEach( ( container ) => {
			container
				.querySelector( '.wp-block-navigation__responsive-dialog' )
				?.setAttribute( 'data-lenis-prevent', '' );
		} );

		this.observer = new MutationObserver( this.sync );

		this.containers.forEach( ( container ) => {
			this.observer.observe( container, {
				attributes: true,
				attributeFilter: [ 'class' ],
			} );
		} );

		this.media.addEventListener( 'change', this.sync );
		this.sync();
	}

	sync = () => {
		if ( ! this.containers?.length ) {
			return;
		}

		const isMobile = this.media?.matches ?? false;
		const isOpen =
			isMobile &&
			this.containers.some( ( container ) =>
				container.classList.contains( 'is-menu-open' )
			);

		document.documentElement.classList.toggle( 'wolf-nav-open', isOpen );
		document.body.classList.toggle( 'wolf-nav-open', isOpen );

		if ( this.lenis ) {
			if ( isOpen ) {
				this.lenis.stop();
			} else {
				this.lenis.start();
			}
		}
	};
}
