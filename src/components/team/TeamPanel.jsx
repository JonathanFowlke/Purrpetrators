import { Img } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';

/** Team logo beside a label, heading, and short blurb. Used for the case subject and the dossier header. */
export function TeamPanel({ team, label, headingId, heading, children }) {
  return (
    <section className="case-team" aria-labelledby={headingId}>
      <Img src={team.logo} alt={`${team.name} team logo`} width="144" height="144" />
      <div>
        <OperationLabel>{label}</OperationLabel>
        <h2 id={headingId}>{heading}</h2>
        {children}
      </div>
    </section>
  );
}
