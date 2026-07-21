// @guty pattern
// title: Featured Themes
// slug: seijaku-fse/home-featured-themes
// categories: query, portfolio
// package: SeijakuFSE

<Page>
	<Section
		className="wolf-grid"
		align="full"
		layoutType="constrained"
		layoutContentSize="var(--wp--style--global--wide-size)"
	>
		<Container
			className="wolf-grid__header"
			layoutType="flex"
			layoutJustifyContent="space-between"
		>
			<Heading level={ 2 } className="wolf-grid__title">
				Featured themes
			</Heading>
			<Paragraph className="wolf-grid__text">{ `<span class="wolf-grid__text-dot" aria-hidden="true"></span>Hand-picked from our full catalog` }</Paragraph>
		</Container>
		<Block
			name="wolf-store/theme-index"
			perPage={ 12 }
			pagination="none"
			orderby="featured"
			order="DESC"
			cardHeading="h2"
		/>
		<Buttons layoutType="flex" layoutJustifyContent="center">
			<Button
				className="wolf-btn-lg"
				url="/wordpress-themes">
				See All 40+ Themes
			</Button>
		</Buttons>
	</Section>
</Page>
