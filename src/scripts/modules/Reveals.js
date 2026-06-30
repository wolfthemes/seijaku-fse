export default class Reveals {
	constructor( { reduced } = {} ) {
		const targets = document.querySelectorAll(
			'.wolf-reveal, .wolf-reveal-group'
		);

		if ( ! targets.length ) {
			return;
		}

		if ( reduced || ! ( 'IntersectionObserver' in window ) ) {
			targets.forEach( ( el ) => el.classList.add( 'is-inview' ) );
			return;
		}

		const observer = new IntersectionObserver(
			( entries, obs ) => {
				entries.forEach( ( entry ) => {
					if ( ! entry.isIntersecting ) {
						return;
					}

					entry.target.classList.add( 'is-inview' );
					obs.unobserve( entry.target );
				} );
			},
			{ rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
		);

		targets.forEach( ( el ) => observer.observe( el ) );
	}
}
