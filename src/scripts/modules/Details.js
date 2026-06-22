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
					getComputedStyle(
						document.documentElement
					).getPropertyValue( '--wolf-dur' )
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
		const target = panel.scrollHeight + 'px';

		// Both keyframes given to WAAPI at once — no intermediate paint.
		const anim = panel.animate(
			[ { blockSize: '0px' }, { blockSize: target } ],
			{
				duration: this.dur,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				fill: 'none',
			}
		);

		anim.addEventListener(
			'finish',
			() => {
				panel.style.blockSize = 'auto';
			},
			{ once: true }
		);
	}

	close( details, panel ) {
		const from = panel.scrollHeight + 'px';

		// Snapshot → 0 in one WAAPI call; no reflow trick needed.
		const anim = panel.animate(
			[ { blockSize: from }, { blockSize: '0px' } ],
			{
				duration: this.dur,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				fill: 'none',
			}
		);

		anim.addEventListener(
			'finish',
			() => {
				details.open = false;
				panel.style.blockSize = '0px';
			},
			{ once: true }
		);
	}
}
