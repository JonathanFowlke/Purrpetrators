import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { PageHeading } from '../components/ui/PageHeading.jsx';
import { HotlinePanel, ContactLink } from '../components/ui/HotlinePanel.jsx';
import { Callout } from '../components/ui/Callout.jsx';
import { Redacted } from '../components/ui/Redacted.jsx';
import { TipLayout, GuidanceAside, GuidanceSection, TipPanel } from '../components/forms/TipLayout.jsx';
import { TallyEmbed, OfflineNotice } from '../components/forms/TallyEmbed.jsx';
import { Link, useSite } from '../lib/site.jsx';
import { CORRECTIONS_EMAIL, HOTLINE } from '../lib/constants.js';

export function TipsPage() {
  const { model } = useSite();
  return (
    <SiteLayout
      title="PNN Tip Line â€” Report suspicious activity"
      description="A suspicious prank? An unexplained paw print? Send a Broomstick Challenge field report to the PNN Tip Line for review."
      og={{ title: 'PNN Tip Line â€” Something to report?', description: 'Neighborhood tips. Questionable motives. Human review before publication.', path: '/tips/' }}
      current="tips"
      mainClassName="case-main"
    >
      <PageHeading eyebrow="PNN Tip Line" title={<>Something to <em>report?</em></>} intro="Help Inspector Clueso catch the Prowling Purrpetrators. His theory could use some facts." signature>
        <p>All teams welcome. Send game-related sightings, prank reports, or evidence to Clueso's office at PNN. Other teams' mischief and corrections are welcome, too.</p>
      </PageHeading>
      <HotlinePanel id="hotline-heading" label="PNN Hotline Â· Inspector Clueso's office" title="Prefer to call in your clues?" aside={<ContactLink href={HOTLINE.tel} ariaLabel={HOTLINE.aria} text={HOTLINE.vanity} note={`Dial ${HOTLINE.numeric}`} />}>
        <p>Call the office with your game-related tip. Use the form below to send photos or video.</p>
      </HotlinePanel>
      <TipLayout>
        <GuidanceAside label="Before you report">
          <GuidanceSection label="For the record" title="Game mischief only."><p>This tip line is part of the Broomstick Challenge neighborhood game, not an emergency or public-safety reporting service.</p></GuidanceSection>
          <GuidanceSection title="Useful intelligence">
            <ul>
              <li>What happened, and approximately when. Bonus points for a motive. Extra bonus for a bad one.</li>
              <li>Anything suspicious: unexplained flags, unclaimed laundry, balloons with an agenda.</li>
              <li>The team involved, if known.</li>
              <li>Photos or short clips you have permission to share.</li>
              <li>Corrections, sightings, and story ideas are welcome.</li>
            </ul>
          </GuidanceSection>
          <GuidanceSection title="Keep it neighborly."><p>Leave out addresses, phone numbers, license plates, and private details. Don't include uninvolved people or material that targets children.</p><p>Be clever and fun, but don't be mean.</p></GuidanceSection>
          <GuidanceSection title="Think PNN got it wrong?"><p>Use the <Link to="corrections/">Corrections Desk</Link>, or email <a href={`mailto:${CORRECTIONS_EMAIL}`}>{CORRECTIONS_EMAIL}</a>. Attachments welcome. Private details are not.</p></GuidanceSection>
          <GuidanceSection title="Evidence checklist"><p>Up to 5 photos or short videos, 10 MB each. Please crop or blur private details before uploading.</p><p>A PNN report does not replace posting photo or video proof to the game group for prank points.</p></GuidanceSection>
        </GuidanceAside>
        <TipPanel id="report-heading" title="File a field report" privacy="This form sends your report and files to Inspector Clueso's office at PNN for private review by the team. Nothing is automatically published. You can leave your name blank and choose whether PNN may publish your report and evidence.">
          <TallyEmbed
            formId={model.tallyFormId}
            title="PNN Tip Line â€” report game activity"
            linkLabel="Open the PNN Tip Line (new tab)"
            offline={(
              <OfflineNotice label="Transmission pending" title="The tip desk is getting connected." link={{ to: 'cases/', label: 'Browse the open case files â†’' }}>
                <p>Online reports aren't open yet. Check back soon. Nothing can be submitted or uploaded from this page until the form is available.</p>
              </OfflineNotice>
            )}
          />
        </TipPanel>
      </TipLayout>
      <section className="tip-process" aria-labelledby="review-heading">
        <h2 id="review-heading">What happens next?</h2>
        <ol>
          <li><strong>Delivered to the office.</strong> Inspector Clueso's office receives your report for private PNN review.</li>
          <li><strong>Human review.</strong> We check the details, game rules, and publication permission.</li>
          <li><strong>Possible case file.</strong> Approved material may become a PNN report. Your identity stays private. In the file, you are <Redacted chars={9} />.</li>
        </ol>
      </section>
      <Callout id="flier-heading" label="From the print desk" title="Put the neighborhood on the case." action={{ to: 'tips/flier.html', label: 'Open printable flier â†’' }}>
        <p>Print a letter-size Tip Line flier with the QR code and PNN Hotline.</p>
      </Callout>
    </SiteLayout>
  );
}
