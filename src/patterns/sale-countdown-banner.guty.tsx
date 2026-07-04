// @guty pattern
// title: Sale Countdown Banner
// slug: seijaku-fse/sale-countdown-banner
// categories: banner, call-to-action
// package: SeijakuFSE

<Page>
	<Container
		className="is-dark wolf-countdown-banner"
		align="full"
		layoutType="constrained"
		layoutContentSize="var(--wp--style--global--content-size)"
		layoutJustifyContent="center"
	>
		<Columns verticalAlignment="center">
			<Column width="30%">
				<Paragraph className="wolf-countdown-banner__text">
					20% off launch pricing — ends July 15
				</Paragraph>
			</Column>
			<Column>
				<Block
					name="wolf-blocks/countdown"
					targetDate="2026-07-15T23:59:59"
					expiredText="Offer has ended"
					showDays={ true }
					showSeconds={ true }
				/>
			</Column>
		</Columns>
	</Container>
</Page>
