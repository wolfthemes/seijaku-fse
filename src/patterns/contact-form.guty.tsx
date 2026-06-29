// @guty pattern
// title: Contact Form
// slug: seijaku-fse/contact-form
// categories: contact, text
// description: A narrow placeholder section for a contact form shortcode.
// package: SeijakuFSE

<Page>
	<Section
		anchor="contact-form"
		metadata={ { name: 'Contact form' } }
		align="full"
		className="wolf-section-pad--big"
		layoutType="constrained"
		layoutContentSize="760px"
	>
		<Heading level={ 2 } textAlign="center">
			Send a message
		</Heading>
		<Paragraph textAlign="center" mb="{6}">
			Fill the form below and I will get back to you shortly
		</Paragraph>
		<Shortcode>{ `[contact-form-7 id="CONTACT_FORM_ID"]` }</Shortcode>
	</Section>
</Page>
