import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { ListingCard, CardList } from '../components/ui/ListingCard.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Caption } from '../components/ui/Caption.jsx';
import { CaseTime } from '../components/ui/Time.jsx';
import { CaseTipCallout } from '../components/case/TipCallout.jsx';
import { useSite } from '../lib/site.jsx';

export function CasesIndexPage() {
  const { model } = useSite();
  return (
    <SiteLayout title="Case files — PNN" description="PNN investigations from the Broomstick Challenge." current="cases" mainClassName="case-main">
      <Eyebrow>The Purrveillance desk</Eyebrow>
      <h1>Case files</h1>
      <p className="intro">Clueso follows the facts. Preferably toward the pink team.</p>
      <CardList items={model.published} empty={<p>No open files. Suspiciously quiet.</p>}>
        {model.published.map(record => (
          <ListingCard key={record.id} label={`${record.caseNumber} · ${record.status}`} title={record.incidentTitle} to={`cases/${record.id}/`}>
            <p>{record.summary}</p>
            <Caption><CaseTime record={record} /></Caption>
          </ListingCard>
        ))}
      </CardList>
      <CaseTipCallout />
    </SiteLayout>
  );
}
