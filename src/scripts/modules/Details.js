/**
 * Animated details/summary for .wp-block-details.
 *
 * The browser removes [open] synchronously on close, so CSS transitions on
 * block-size never fire in the closing direction. We intercept both directions,
 * drive the animation via scrollHeight, and let the browser handle a11y/state.
 */
export default class Details {
	constructor( { reduced = false } = {} ) {
		this.reduced = reduced;
		this.items = document.querySelectorAll( '.wp-block-details' );
		this.dur = reduced
			? 0
			: parseFloat(
					getComputedStyle( document.documentElement ).getPropertyValue(
						'--wolf-dur'
					)
			  ) * 1000 || 500;

		this.init();
	}

	init() {
		this.items.forEach( ( details ) => {
			const summary = details.querySelector( 'summary' );
			const panel = details.querySelector( ':scope > :not(summary)' );

			if ( ! summary || ! panel ) {
				return;
			}

			// Ensure panel is measurable and hidden when closed.
			panel.style.overflow = 'hidden';

			if ( ! details.open ) {
				panel.style.blockSize = '0px';
				panel.style.display = 'block';
			}

			summary.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				if ( details.open ) {
					this.close( details, panel );
				} else {
					this.open( details, panel );
				}
			} );
		} );
	}

	open( details, panel ) {
		details.open = true;
		const target = panel.scrollHeight;

		panel.style.blockSize = '0px';

		// Force reflow so the starting value is registered before transitioning.
		panel.offsetHeight; // eslint-disable-line no-unused-expressions

		panel.style.transition = `block-size ${ this.dur }ms var(--wolf-ease-out, ease)`;
		panel.style.blockSize = target + 'px';

		panel.addEventListener(
			'transitionend',
			() => {
				panel.style.blockSize = 'auto';
				panel.style.transition = '';
			},
			{ once: true }
		);
	}

	close( details, panel ) {
		panel.style.blockSize = panel.scrollHeight + 'px';

		panel.offsetHeight; // eslint-disable-line no-unused-expressions

		panel.style.transition = `block-size ${ this.dur }ms var(--wolf-ease-out, ease)`;
		panel.style.blockSize = '0px';

		panel.addEventListener(
			'transitionend',
			() => {
				details.open = false;
				panel.style.transition = '';
			},
			{ once: true }
		);
	}
}
