import { useSite, Link } from '../../lib/site.jsx';
import { suspectTeamsOf } from '../../lib/model.js';
import { Prose } from '../../lib/prose.jsx';
import { CaseBack } from '../ui/CaseBack.jsx';
import { Caption } from '../ui/Caption.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { MetaList } from '../ui/MetaList.jsx';
import { CaseTime } from '../ui/Time.jsx';
import { TeamName } from '../ui/TeamName.jsx';
import { TeamPanel } from '../team/TeamPanel.jsx';
import { Evidence } from './Evidence.jsx';
import { OrganizerNotice } from './OrganizerNotice.jsx';
import { RatingsSection } from './RatingsSection.jsx';

/** A full case file: heading, the report column, and the subject-team and evidence aside. */
export function CaseFile({ record }) {
  const { model } = useSite();
  const teams = suspectTeamsOf(record, model.teamById);
  const many = teams.length > 1;
  const related = (record.relatedCaseIds || []).map(id => model.caseById.get(id)).filter(item => item.published);
  return (
    <>
      <CaseBack to="cases/">← All case files</CaseBack>
      <article>
        <header className="case-heading">
          <Eyebrow badge={record.status}>{record.caseNumber}</Eyebrow>
          <h1>{record.incidentTitle}</h1>
          <p className="intro">{record.summary}</p>
          <MetaList items={[
            { term: many ? 'Subject teams' : 'Subject team', value: teams.map(team => team.name).join(' and ') },
            { term: 'Opened', value: <CaseTime record={record} /> },
            { term: 'PNN threat rating', value: record.threatLevel }
          ]} />
        </header>
        <div className="case-layout">
          <div className="case-report">
            <section><h2>The incident</h2><Prose text={record.incidentDescription} linkTeams /></section>
            {related.map(item => (
              <Caption key={item.id}>Previously on the PNN desk: <Link to={`cases/${item.id}/`}>{item.caseNumber} — {item.incidentTitle}</Link></Caption>
            ))}
            {record.organizerNotice ? <OrganizerNotice notice={record.organizerNotice} /> : null}
            <section><h2>Suspected motive</h2><Prose text={record.suspectedMotive} linkTeams /></section>
            <section><h2>Investigator's note</h2><Prose text={record.investigatorNote} linkTeams /><p className="signature">— Inspector Clueso, PNN</p></section>
            <section className="case-assessment"><h2>Official PNN assessment</h2><Prose text={record.disposition} linkTeams /></section>
            {record.purrHiss ? <RatingsSection ratings={record.purrHiss} teamById={model.teamById} /> : null}
          </div>
          <aside aria-label={many ? 'Subject teams and evidence' : 'Subject team and evidence'}>
            {teams.map((team, i) => (
              <TeamPanel key={team.id} team={team} label={`${many ? (i ? 'Co-subject' : 'Lead subject') : 'Subject team'} · ${team.color}`}
                headingId={i ? `subject-team-heading-${i + 1}` : 'subject-team-heading'} heading={<TeamName team={team} />}>
                <p>Named in this PNN investigation. <Link to={`teams/${team.slug}/`}>Read the dossier →</Link></p>
              </TeamPanel>
            ))}
            {record.evidence.map((item, index) => <Evidence key={item.id} item={item} index={index} />)}
          </aside>
        </div>
      </article>
    </>
  );
}
