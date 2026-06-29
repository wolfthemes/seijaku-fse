// @guty pattern
// title: About Intro
// slug: seijaku-fse/about-intro
// categories: about, text
// description: A minimal personal introduction for the About page.
// package: SeijakuFSE

<Page>
	<Section
		align="full"
		className="wolf-section-pad--big"
		layoutType="constrained"
		layoutContentSize="720px"
	>
		<Image
			align="center"
			width="120px"
			height="120px"
			scale="cover"
			sizeSlug="thumbnail"
			src="../assets/images/me.jpg"
			alt="Constantin"
			linkDestination="none"
			style={ { border: { radius: '999px' } } }
		/>
		<Heading level={ 1 } textAlign="center" fontSize="hero">
			Hi there,
		</Heading>
		<Paragraph textAlign="center" fontSize="md">
			I'm Constantin, the founder of WolfThemes. I design and build
			WordPress themes for creative people who need a site that looks
			sharp, works reliably, and stays easy to manage.
		</Paragraph>
	</Section>
</Page>;
