// @guty pattern
// title: Hero
// slug: seijaku-fse/home-hero
// categories: hero
// package: SeijakuFSE

<Page>
	<Container
		align="full"
		className="wolf-hero"
		layoutType="constrained"
		layoutContentSize="var(--wp--style--global--wide-size)"
	>
		<Container
			className="wolf-hero__inner"
			layoutType="flex"
			layoutOrientation="vertical"
		>
			<Paragraph className="wolf-hero__eyebrow wolf-eyebrow">{ `<span class="wolf-hero__eyebrow--stars" aria-hidden="true">★★★★★</span> 4.5/5 from 1,600+ reviews <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> 36,000 customers <span class="wolf-hero__eyebrow--separator" aria-hidden="true">✦</span> since 2012` }</Paragraph>
			<Heading level={ 1 } className="wolf-hero__title">{ `<span class="wolf-hero__title-text">WordPress Solutions for</span> <span class="wolf-hero__title-rest">Musicians, Artists & Creators</span>` }</Heading>
			<Container
				className="wolf-hero__bottom"
				layoutType="flex"
				layoutOrientation="vertical"
				layoutJustifyContent="center"
			>
				<Paragraph mb={ 3 } className="wolf-hero__tagline wolf-hero__text-line wolf-tagline">
					Handcrafted WordPress themes for musicians, artists &amp;
					creators. Built and supported by one person for 14 years.
				</Paragraph>
				<Container
					className="wolf-hero__cta"
					layoutType="flex"
					layoutOrientation="vertical"
					layoutJustifyContent="center"
				>
					<Buttons
						className="wolf-hero__actions wolf-btn-lg"
						layoutType="flex"
					>
						<Button url="/wordpress-themes">Find Your Theme</Button>
					</Buttons>
					<Paragraph className="wolf-hero__note">{ `7-day money-back guarantee` }</Paragraph>
				</Container>
			</Container>
		</Container>
	</Container>
</Page>
