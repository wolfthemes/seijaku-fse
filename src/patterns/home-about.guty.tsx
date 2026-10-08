// @guty pattern
// title: About
// slug: seijaku-fse/home-about
// categories: about
// package: SeijakuFSE

<Page>
	<Section
		backgroundColor="base-2"
		className="wolf-about wolf-section-pad--big"
		align="full"
		layoutType="constrained"
		layoutContentSize="var(--wp--style--global--wide-size)"
	>
		<Columns verticalAlignment="center">
			<Column width="60%" className="wolf-about__main">
				<Paragraph className="wolf-about__eyebrow wolf-eyebrow">
					The person behind the code
				</Paragraph>
				<Heading level={ 2 } className="wolf-about__title">
					I'm Constantin. For 15 years, I've been the only person
					writing every line of WolfThemes.
				</Heading>
				<Paragraph className="wolf-about__text">
					No agency, no rotating dev team, no outsourced support
					tickets. Every theme here started as a real problem someone
					brought to me: a band needing a tour page, a label needing a
					catalogue that didn't feel like a spreadsheet.
				</Paragraph>
				<Paragraph className="wolf-about__text">
					When you reach out, you're talking to the person who built
					the theme, not a queue — I reply within 24 hours, usually
					faster. That's the whole reason I started selling direct.
				</Paragraph>
				<Paragraph className="wolf-about__text">
					Know my themes from ThemeForest? These are the same themes,
					bought direct: better support, a 7-day money-back
					guarantee, and more of your money going to the person who
					actually builds them.
				</Paragraph>
				<Paragraph className="wolf-about__text">
					Need something beyond a theme? I'm also available for
					selected custom WordPress projects.
				</Paragraph>
				<Buttons>
					<Button
						className="is-style-text"
						url="https://constantin.saguin.com/services?utm_source=wolfthemes&utm_medium=about"
					>
						Work with me →
					</Button>
				</Buttons>
			</Column>
			<Column width="40%" className="wolf-about__pullquote">
				<Paragraph>{ `15 years.<br>36,000 customers.<br>4.5/5 out of 1600+ ratings.` }</Paragraph>
				<Paragraph>{ `"The customer support is what sets it apart." — joergrappl, on Tune` }</Paragraph>
			</Column>
		</Columns>
	</Section>
</Page>
