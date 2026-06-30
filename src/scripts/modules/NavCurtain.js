export default class NavCurtain {
	constructor( { reduced } = {} ) {
		if ( reduced ) {
			return;
		}

		document
			.querySelectorAll( '.wolf-nav .wp-block-navigation-item__label' )
			.forEach( ( label ) => {
				const clone = document.createElement( 'span' );
				clone.className = 'wolf-nav-curtain';
				clone.textContent = label.textContent;
				clone.setAttribute( 'aria-hidden', 'true' );
				label
					.closest( '.wp-block-navigation-item__content' )
					.appendChild( clone );
			} );
	}
}
