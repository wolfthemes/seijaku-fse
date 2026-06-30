/**
 * Replace <img src="*.svg"> elements with inline SVG fetched from the same URL.
 * Preserves id, class, aria-label, role, style, and width/height attributes.
 *
 * @param {string} selector  CSS selector for img elements to inline. Defaults to img[src$=".svg"].
 * @returns {Promise<SVGSVGElement[]>}  Resolves with all successfully inlined SVG elements.
 */
export async function inlineSvg( selector = 'img[src$=".svg"]' ) {
	const imgs = Array.from( document.querySelectorAll( selector ) );
	if ( ! imgs.length ) {
		return [];
	}

	const results = await Promise.allSettled(
		imgs.map( ( img ) => replaceOne( img ) )
	);

	return results
		.filter( ( r ) => r.status === 'fulfilled' )
		.map( ( r ) => r.value );
}

async function replaceOne( img ) {
	const url = img.src;
	const res = await fetch( url );
	if ( ! res.ok ) {
		throw new Error( `InlineSvg: failed to fetch ${ url }` );
	}
	const text = await res.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString( text, 'image/svg+xml' );
	const svg = doc.querySelector( 'svg' );
	if ( ! svg ) {
		throw new Error( `InlineSvg: no <svg> found in ${ url }` );
	}

	// Forward attributes from the img to the SVG.
	if ( img.id ) svg.setAttribute( 'id', img.id );
	if ( img.getAttribute( 'aria-label' ) ) {
		svg.setAttribute( 'aria-label', img.getAttribute( 'aria-label' ) );
	}
	if ( img.getAttribute( 'role' ) ) {
		svg.setAttribute( 'role', img.getAttribute( 'role' ) );
	}
	// Merge classes.
	const classes = img.className
		.split( ' ' )
		.filter( Boolean )
		.filter( ( c ) => c !== 'replaced-svg' );
	classes.push( 'replaced-svg' );
	svg.classList.add( ...classes );
	// Preserve inline width/height style if present.
	if ( img.style.width ) svg.style.width = img.style.width;
	if ( img.style.height ) svg.style.height = img.style.height;

	svg.removeAttribute( 'xmlns:a' );

	// Ensure viewBox exists so CSS width/height scale the SVG rather than clip it.
	if ( ! svg.getAttribute( 'viewBox' ) ) {
		const w = svg.getAttribute( 'width' );
		const h = svg.getAttribute( 'height' );
		if ( w && h ) {
			svg.setAttribute( 'viewBox', `0 0 ${ w } ${ h }` );
		}
	}
	svg.removeAttribute( 'width' );
	svg.removeAttribute( 'height' );

	img.replaceWith( svg );
	return svg;
}
