import { useSite, Link } from '../../lib/site.jsx';
import { Inline, InlineList, Prose } from '../../lib/prose.jsx';
import { CaseBack } from '../ui/CaseBack.jsx';
import { Caption } from '../ui/Caption.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { MetaList } from '../ui/MetaList.jsx';
import { TeamPanel } from './TeamPanel.jsx';
import { standingText } from './standing.js';

function CaseHistory({ team, involved }) {
  if (!involved.length) return <p>No case files. {team.isOurTeam ? 'Clueso considers this the most incriminating record of all.' : 'Clueso finds this suspicious and slightly insulting.'}</p>;
  return (
    <ul className="case-list-items">
      {involved.map(record => {
        const rating = (record.purrHiss || []).find(item => item.teamId === team.id);
        return (
          <li key={record.id}>
            <Link to={`cases/${record.id}/`}><strong>{record.caseNumber}</strong> {record.incidentTitle}</Link>
            {rating ? <><br /><span className="case-caption">{rating.note}</span></> : null}
          </li>
        );
      })}
    </ul>
  );
}

/** A team's dossier: roasting file, strengths and weaknesses, advice, and case history. */
export function Dossier({ team }) {
  const { model } = useSite();
  const d = model.dossiers[team.id];
  const row = model.index.totals.get(team.id);
  const involved = model.published
    .filter(record => record.suspectTeamId === team.id || (record.coSuspectTeamIds || []).includes(team.id) || (record.purrHiss || []).some(item => item.teamId === team.id))
    .sort((a, b) => Date.parse(a.dateOpened) - Date.parse(b.dateOpened));
  return (
    <>
      <CaseBack to="teams/">← All dossiers</CaseBack>
      <article>
        <header className="case-heading">
          <Eyebrow badge={d.codename}>Team dossier</Eyebrow>
          <h1>{team.name}</h1>
          <p className="intro">{d.tagline}</p>
          <MetaList items={[
            { term: 'Team color', value: team.color },
            { term: 'Threat level', value: d.threatLevel },
            { term: 'Catnip & Hairball', value: standingText(row) }
          ]} />
        </header>
        <div className="case-layout">
          <div className="case-report">
            <section><h2>Known for</h2><InlineList items={d.knownFor} caseNumbers /></section>
            <section><h2>The file</h2><Prose text={d.file} linkTeams caseNumbers selfId={team.id} /></section>
            <section className="dossier-pair">
              <div><h2>Strengths</h2><InlineList items={d.strengths} caseNumbers /></div>
              <div><h2>Weaknesses</h2><InlineList items={d.weaknesses} caseNumbers /></div>
            </section>
            <section className="case-assessment"><h2>Clueso's advice</h2><p><Inline text={d.advice} /></p><p className="signature">— Inspector Clueso, PNN</p></section>
          </div>
          <aside aria-label="Team logo and case history">
            <TeamPanel team={team} label={`Team color · ${team.color}`} heading={team.name}>
              <p>{team.isOurTeam ? 'The suspect Clueso cannot catch.' : 'Under PNN observation.'}</p>
            </TeamPanel>
            <section className="case-evidence">
              <h2 className="dossier-side-heading">Case history</h2>
              <CaseHistory team={team} involved={involved} />
              <Caption>Comedy ratings: {standingText(row)}. <Link to="index.html#catnip-index-heading">See the Catnip &amp; Hairball Index.</Link></Caption>
            </section>
          </aside>
        </div>
      </article>
    </>
  );
}
