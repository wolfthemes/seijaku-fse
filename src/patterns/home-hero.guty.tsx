// @guty pattern
// title: Hero
// slug: seijaku-fse/home-hero
// categories: hero
// package: SeijakuFSE

<Page>
	<Container align="full" className="wolf-hero" layoutType="constrained">
		<Container
			className="wolf-hero__inner"
			layoutType="flex"
			layoutOrientation="vertical"
		>
			<Paragraph className="wolf-hero__eyebrow wolf-eyebrow">{ `★ 4.5/5 from 1,600+ reviews <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> 36,000 customers <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> since 2011` }</Paragraph>
			<Heading level={ 1 } className="wolf-hero__title">{ `<span class="wolf-hero__title-text">Websites That Sell Your</span> <span class="wolf-rotating-words" aria-label="Music, Art &amp; Work"><span class="wolf-rotating-words__clip"><span class="wolf-rotating-words__inner"><span class="wolf-rotating-word">Music</span><span class="wolf-rotating-word">Art</span><span class="wolf-rotating-word">Work</span></span></span></span>` }</Heading>
			<Paragraph
				textAlign="center"
				className="wolf-hero__tagline wolf-hero__text-line wolf-tagline"
			>
				Handcrafted WordPress themes for musicians, artists &amp;
				creators — built and supported by one person for 14 years.
			</Paragraph>
			<Buttons
				className="wolf-hero__actions wolf-btn-lg"
				layoutType="flex"
				layoutJustifyContent="center"
			>
				<Button url="/wordpress-themes">Find Your Theme</Button>
			</Buttons>
			<Paragraph
				textAlign="center"
				className="wolf-hero__note"
			>{ `From $69/yr &middot; 7-day money-back guarantee` }</Paragraph>
		</Container>
	</Container>
</Page>
