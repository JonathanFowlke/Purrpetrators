import { TallyEmbed, OfflineNotice } from './TallyEmbed.jsx';
import { TipLayout, GuidanceAside, GuidanceSection, TipPanel } from './TipLayout.jsx';

export default { title: 'Forms/Tip line', parameters: { layout: 'padded' } };

const offline = (
  <OfflineNotice label="Transmission pending" title="The tip desk is getting connected." link={{ to: 'cases/', label: 'Browse the open case files →' }}>
    <p>Online reports aren't open yet.</p>
  </OfflineNotice>
);

export const FormLayout = {
  render: () => (
    <TipLayout>
      <GuidanceAside label="Before you report">
        <GuidanceSection label="For the record" title="Game mischief only."><p>Part of the Broomstick Challenge neighborhood game.</p></GuidanceSection>
        <GuidanceSection title="Useful intelligence"><ul><li>What happened, and approximately when.</li></ul></GuidanceSection>
      </GuidanceAside>
      <TipPanel id="story-report" title="File a field report" privacy="This form sends your report to Inspector Clueso's office at PNN for private review."><TallyEmbed formId="" offline={offline} /></TipPanel>
    </TipLayout>
  )
};

export const Unconfigured = { render: () => <TallyEmbed formId="" offline={offline} /> };
export const ConfiguredEmbed = { render: () => <TallyEmbed formId="ODWPok" title="PNN Tip Line — report game activity" linkLabel="Open the PNN Tip Line (new tab)" /> };
