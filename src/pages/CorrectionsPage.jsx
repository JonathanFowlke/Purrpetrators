import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { PageHeading } from '../components/ui/PageHeading.jsx';
import { HotlinePanel, ContactLink } from '../components/ui/HotlinePanel.jsx';
import { Callout } from '../components/ui/Callout.jsx';
import { TipLayout, GuidanceAside, GuidanceSection, TipPanel } from '../components/forms/TipLayout.jsx';
import { TallyEmbed } from '../components/forms/TallyEmbed.jsx';
import { CORRECTIONS_EMAIL, CORRECTIONS_FORM_ID } from '../lib/constants.js';

export function CorrectionsPage() {
  return (
    <SiteLayout
      title="PNN Corrections Desk — Set the record straight"
      description="Did PNN get something wrong? Send a correction or your side of the story to the PNN Corrections Desk, part of the Broomstick Challenge neighborhood game."
      og={{ title: 'PNN Corrections Desk — Did we get it wrong?', description: 'Facts only. Clueso will read them carefully and ignore the ones that hurt.', path: '/corrections/' }}
      current="corrections"
      mainClassName="case-main"
    >
      <PageHeading eyebrow="PNN Corrections Desk" title={<>Did we get it <em>wrong?</em></>} intro="Inspector Clueso's office takes corrections seriously, which is to say he will read them carefully and then ignore the ones that hurt." signature>
        <p><strong>Facts only:</strong> wrong dates, wrong details, wrong team, missing context. <em>"That is not funny"</em> is an opinion, not a correction. Every team named in a case file has the right of reply.</p>
      </PageHeading>
      <HotlinePanel id="email-heading" label="Prefer email? · Clueso's office" title="Send it to the office." aside={<ContactLink href={`mailto:${CORRECTIONS_EMAIL}`} ariaLabel={`Email Inspector Clueso's office at ${CORRECTIONS_EMAIL}`} text={CORRECTIONS_EMAIL} note="Attachments welcome. Private details are not." />}>
        <p>Corrections, replies, and game-related material you have permission to share can also go straight to the inbox. Please read the privacy notes below first.</p>
      </HotlinePanel>
      <TipLayout>
        <GuidanceAside label="Before you submit">
          <GuidanceSection label="For the record" title="Game mischief only."><p>This desk is part of the Broomstick Challenge neighborhood game, not a legal, safety, or complaints service. PNN is fictional, and so are its rulings.</p></GuidanceSection>
          <GuidanceSection title="Useful corrections">
            <ul>
              <li>Which case, newsletter, or page, and what it says.</li>
              <li>What actually happened, and when.</li>
              <li>Photos or short clips you have permission to share.</li>
              <li>Your side of the story. Clueso may still disagree.</li>
            </ul>
          </GuidanceSection>
          <GuidanceSection title="Keep it neighborly."><p>Leave out addresses, phone numbers, license plates, and private details. Don't include people who aren't playing, or anything that targets children.</p><p>Be clever and fun, but don't be mean.</p></GuidanceSection>
          <GuidanceSection title="What happens next?"><p><strong>Private review.</strong> A human reads every submission and checks it against the game rules.</p><p><strong>Publication only with permission.</strong> Nothing goes public automatically. Accurate corrections fix the record.</p></GuidanceSection>
        </GuidanceAside>
        <TipPanel id="correction-heading" title="File a correction" privacy="This form sends your correction and any files to Inspector Clueso's office at PNN for private review by the team. You choose whether PNN may publish it, and your email address is never published.">
          <TallyEmbed formId={CORRECTIONS_FORM_ID} title="PNN Corrections Desk — correct the record" linkLabel="Open the PNN Corrections Desk (new tab)" />
        </TipPanel>
      </TipLayout>
      <Callout id="corrections-tip-heading" label="Something new to report?" title="That's a job for the Tip Line." tip action={{ to: 'tips/', label: 'File a field report →' }}>
        <p>Corrections fix the record. Tips make new ones. Send sightings, prank reports, and approved evidence to Inspector Clueso's office.</p>
      </Callout>
    </SiteLayout>
  );
}
