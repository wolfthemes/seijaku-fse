export default class MobileNav {
	constructor( { lenis = null, reduced = false } = {} ) {
		this.lenis = lenis;
		this.reduced = reduced;
		this.media = window.matchMedia( '(max-width: 781.98px)' );
		this.containers = Array.from(
			document.querySelectorAll(
				'.wolf-nav .wp-block-navigation__responsive-container'
			)
		);

		if ( ! this.containers.length ) {
			return;
		}

		// Tracks each container's open state so sync() can tell a close
		// transition apart from an unrelated class mutation.
		this.wasOpen = new WeakMap();
		this.containers.forEach( ( container ) =>
			this.wasOpen.set(
				container,
				container.classList.contains( 'is-menu-open' )
			)
		);

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
		let isOpen = false;

		this.containers.forEach( ( container ) => {
			const containerIsOpen =
				container.classList.contains( 'is-menu-open' );

			// animateClose() adds `wolf-nav-closing` synchronously, so check
			// it after — the close transition must keep the lock/backdrop
			// active for the duration of the slide-out, or the header's
			// `backdrop-filter` comes back mid-animation and re-roots the
			// fixed dialog's containing block (it jumps under the marquee).
			if ( this.wasOpen.get( container ) && ! containerIsOpen ) {
				this.animateClose( container );
			}

			const containerIsActive =
				containerIsOpen ||
				container.classList.contains( 'wolf-nav-closing' );
			isOpen = isOpen || ( isMobile && containerIsActive );
			this.wasOpen.set( container, containerIsOpen );
		} );

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

	animateClose( container ) {
		if ( this.reduced ) {
			return;
		}

		const dialog = container.querySelector(
			'.wp-block-navigation__responsive-dialog'
		);

		container.classList.add( 'wolf-nav-closing' );

		// Re-sync once the slide-out finishes so the open/lock state
		// (wolf-nav-open class, lenis.start()) releases only now, not at the
		// start of the close.
		const cleanup = () => {
			container.classList.remove( 'wolf-nav-closing' );
			this.sync();
		};

		if ( dialog ) {
			dialog.addEventListener( 'animationend', cleanup, { once: true } );
		} else {
			cleanup();
		}
	}
}
