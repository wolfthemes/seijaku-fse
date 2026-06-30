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
			<Paragraph className="wolf-hero__eyebrow wolf-eyebrow">{ `36,000+ customers <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> 4.5/5 on ThemeForest <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> since 2011` }</Paragraph>
			<Heading level={ 1 } className="wolf-hero__title">{ `WordPress Themes for <span class="wolf-rotating-words" aria-label="Musicians, Artists &amp; Creators"><span class="wolf-rotating-words__clip"><span class="wolf-rotating-words__inner"><span class="wolf-rotating-word">Musicians</span><span class="wolf-rotating-word">Artists</span><span class="wolf-rotating-word">Creators</span></span></span></span>` }</Heading>
			<Paragraph
				textAlign="center"
				className="wolf-hero__tagline wolf-hero__text-line wolf-tagline"
			>
				Handcrafted themes. Direct support from the person who built
				them.
			</Paragraph>
			<Buttons
				className="wolf-hero__actions wolf-btn-lg"
				layoutType="flex"
				layoutJustifyContent="center"
			>
				<Button url="/wordpress-themes">Browse Themes</Button>
			</Buttons>
		</Container>
	</Container>
</Page>
