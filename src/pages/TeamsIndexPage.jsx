import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { TeamCard } from '../components/team/TeamCard.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { CaseTipCallout } from '../components/case/TipCallout.jsx';
import { useSite } from '../lib/site.jsx';

export function TeamsIndexPage() {
  const { model } = useSite();
  return (
    <SiteLayout title="Team dossiers — PNN" description="PNN dossiers on the seven Broomstick Challenge teams." current="teams" mainClassName="case-main">
      <Eyebrow>The dossier room</Eyebrow>
      <h1>Team dossiers</h1>
      <p className="intro">Seven teams. One inspector. Zero mercy.</p>
      <div className="team-grid">
        {model.teamsByName.map(team => <TeamCard key={team.id} team={team} dossier={model.dossiers[team.id]} row={model.index.totals.get(team.id)} />)}
      </div>
      <CaseTipCallout />
    </SiteLayout>
  );
}
