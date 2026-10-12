import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { Dossier } from '../components/team/Dossier.jsx';
import { CaseTipCallout } from '../components/case/TipCallout.jsx';
import { useSite } from '../lib/site.jsx';

export function TeamPage({ team }) {
  const { model } = useSite();
  return (
    <SiteLayout title={`${team.name}: team dossier — PNN`} description={model.dossiers[team.id].tagline} current="teams" mainClassName="case-main">
      <Dossier team={team} />
      <CaseTipCallout />
    </SiteLayout>
  );
}
