import { Callout } from './Callout.jsx';
import { Caption } from './Caption.jsx';
import { CaseBack } from './CaseBack.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { FrameLabel } from './FrameLabel.jsx';
import { HomeLink } from './HomeLink.jsx';
import { HotlineInline } from './HotlineInline.jsx';
import { HotlinePanel, ContactLink } from './HotlinePanel.jsx';
import { ListingCard, CardList } from './ListingCard.jsx';
import { MetaList } from './MetaList.jsx';
import { OperationLabel } from './OperationLabel.jsx';
import { PageHeading } from './PageHeading.jsx';
import { TeamName } from './TeamName.jsx';
import { CaseTime } from './Time.jsx';
import { HOTLINE } from '../../lib/constants.js';
import { model, ourTeam } from '../../../.storybook/fixtures.js';

export default { title: 'UI/Primitives', parameters: { layout: 'padded' } };

export const Labels = {
  render: () => (
    <>
      <OperationLabel>PNN Tip Line · Inspector Clueso's office</OperationLabel>
      <Eyebrow rule>PNN Tip Line</Eyebrow>
      <Eyebrow badge="Open">PNN-001</Eyebrow>
      <FrameLabel title="Latest case file" tag="PNN-005" />
      <Caption>A small muted caption line.</Caption>
    </>
  )
};

export const Links = {
  render: () => (
    <>
      <HomeLink to="tips/">Submit a tip →</HomeLink>
      <p><CaseBack to="cases/">← All case files</CaseBack></p>
      <p><TeamName team={ourTeam} /></p>
      <HotlineInline>An extra sentence can follow the call text.</HotlineInline>
    </>
  )
};

export const CalloutPanel = {
  render: () => (
    <Callout id="story-callout" label="PNN Tip Line" title="Clueso has a theory. Have any facts?" tip action={{ to: 'tips/', label: 'File a field report →' }}>
      <p>Callouts take a label, heading, body copy, and one action.</p>
    </Callout>
  )
};

export const HotlinePanelWithPhone = {
  render: () => (
    <HotlinePanel id="story-hotline" label="PNN Hotline" title="Prefer to call in your clues?" aside={<ContactLink href={HOTLINE.tel} ariaLabel={HOTLINE.aria} text={HOTLINE.vanity} note={`Dial ${HOTLINE.numeric}`} />}>
      <p>Call the office with your game-related tip.</p>
    </HotlinePanel>
  )
};

export const Heading = {
  render: () => (
    <PageHeading eyebrow="PNN Tip Line" title={<>Something to <em>report?</em></>} intro="Help Inspector Clueso catch the Prowling Purrpetrators." signature>
      <p>Extra introductory copy goes here.</p>
    </PageHeading>
  )
};

export const Meta = {
  render: () => <MetaList items={[{ term: 'Subject team', value: ourTeam.name }, { term: 'Opened', value: <CaseTime record={model.latest} /> }, { term: 'PNN threat rating', value: 'Moderately suspicious' }]} />
};

export const Listing = {
  render: () => (
    <CardList items={model.published} empty={<p>No open files.</p>}>
      {model.published.slice(0, 2).map(record => (
        <ListingCard key={record.id} label={`${record.caseNumber} · ${record.status}`} title={record.incidentTitle} to={`cases/${record.id}/`}>
          <p>{record.summary}</p>
          <Caption><CaseTime record={record} /></Caption>
        </ListingCard>
      ))}
    </CardList>
  )
};

export const EmptyListing = { render: () => <CardList items={[]} empty={<p>No open files. Suspiciously quiet.</p>} /> };
