import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { PageHeading } from '../components/ui/PageHeading.jsx';
import { HotlinePanel } from '../components/ui/HotlinePanel.jsx';
import { ListingCard, CardList } from '../components/ui/ListingCard.jsx';
import { HomeLink } from '../components/ui/HomeLink.jsx';
import { Callout } from '../components/ui/Callout.jsx';
import { OfflineNotice } from '../components/forms/TallyEmbed.jsx';
import { Link, useSite } from '../lib/site.jsx';

// React hoists `<script async src>` into <head>. The provider script writes its form where the tag sits, so a
// listener (never emitted in server output) keeps the tag in place.
const keepInPlace = () => {};

/** EmailOctopus embed. The provider script writes the form where the script tag sits, so it stays in place. */
function Subscribe({ embed }) {
  if (!embed) {
    return (
      <OfflineNotice label="Mailing list pending" title="The subscription desk is getting connected.">
        <p>Email sign-up isn't open yet. Preview the editions above until a sign-up form is published.</p>
      </OfflineNotice>
    );
  }
  return (
    <>
      <script async src={embed.src} data-form={embed.formId} onLoad={keepInPlace} />
      <noscript><p>Enable JavaScript to use the sign-up form above, or <Link to="tips/">send your email through the PNN Tip Line</Link> to be added manually.</p></noscript>
    </>
  );
}

export function NewsletterIndexPage() {
  const { model } = useSite();
  const listed = model.listedNewsletters;
  return (
    <SiteLayout
      title="PNN Newsletter — The newsletter desk"
      description="Case teasers and questionable motives from PNN. Read the latest email edition."
      og={{ title: 'PNN Newsletter — The newsletter desk', description: 'Go big or go haunt. Pink science and one very tight alibi. Read the first edition.', path: '/newsletter/' }}
      current="newsletter"
      mainClassName="case-main"
    >
      <PageHeading className="newsletter-heading" eyebrow="The PNN newsletter desk" title={<>All the news.<br /><em>Pending investigation.</em></>} intro="An email briefing of neighborhood investigations, questionable motives, and noteworthy mischief." />
      <HotlinePanel id="subscribe-heading" label="Join the mailing list" title="Never miss an edition." aside={<Subscribe embed={model.subscribe} />}>
        <p>New PNN editions land straight in your inbox, pink-planning statistics and all.</p>
      </HotlinePanel>
      <CardList items={listed} empty={<p>The first edition is in preparation.</p>}>
        {listed.map(edition => (
          <ListingCard key={edition.id} label={`Edition ${edition.id} · ${edition.status === 'sample' ? 'Email sample' : 'Published edition'}`} title={edition.title} to={`newsletter/${edition.id}/`}>
            <p>{edition.preheader}</p>
            <HomeLink to={`newsletter/${edition.id}/`}>{edition.status === 'sample' ? 'Preview' : 'Read'} edition {edition.id} →</HomeLink>
          </ListingCard>
        ))}
      </CardList>
      <Callout id="newsletter-tip-heading" label="Got a lead for the next edition?" title="Send it to the office." tip action={{ to: 'tips/', label: 'File a field report →' }}>
        <p>Inspector Clueso's office at PNN accepts tips, photos, and corrections. Every submission gets a human review before publication.</p>
      </Callout>
    </SiteLayout>
  );
}
