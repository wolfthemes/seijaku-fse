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
			<Heading level={ 1 } className="wolf-hero__title">{ `WordPress Themes for <span class="wolf-rotating-words" aria-label="Musicians, Artists &amp; Creators"><span class="wolf-rotating-words__clip"><span class="wolf-rotating-words__inner"><span class="wolf-rotating-word">Musicians</span><span class="wolf-rotating-word">Artists</span><span class="wolf-rotating-word">Creators</span></span></span><svg class="wolf-word-svg" data-word="0" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M0,10 Q6,4 12,10 T24,10 T36,10 T48,10 T60,10 T72,10 T84,10 T96,10 T108,10 T120,10 T132,10 T144,10 T156,10 T168,10 T180,10 T192,10 T204,10 T216,10 T228,10 T240,10 T252,10 T264,10 T276,10 T288,10 T300,10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg><svg class="wolf-word-svg" data-word="1" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M0,14 C60,3 180,18 300,12" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"/></svg><svg class="wolf-word-svg" data-word="2" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M0,14 C64,8 171,18 300,12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg></span>` }</Heading>
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
