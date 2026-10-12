import { Img, Link } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { Caption } from '../ui/Caption.jsx';
import { standingText } from './standing.js';

/** Team summary card for the dossier room. */
export function TeamCard({ team, dossier, row }) {
  return (
    <article className="team-card">
      <Img src={team.logo} width="96" height="96" alt="" loading="lazy" decoding="async" />
      <div>
        <OperationLabel>{team.color} · {dossier.codename}</OperationLabel>
        <h2><Link to={`teams/${team.slug}/`}>{team.name}</Link></h2>
        <p className="team-tagline">{dossier.tagline}</p>
        <Caption>Threat level: {dossier.threatLevel} · {standingText(row)}</Caption>
      </div>
    </article>
  );
}
