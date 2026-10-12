import { Img, Link } from '../../lib/site.jsx';
import { SITE } from '../../lib/constants.js';
import { OperationLabel } from '../ui/OperationLabel.jsx';

/** "Meet your usual suspects" block for the team that runs PNN. */
export function TeamSpotlight({ team }) {
  return (
    <section className="operation" aria-label="About the team">
      <Img className="team-logo" src="assets/images/logo.png" alt="Prowling Purrpetrators team logo" width="600" height="516" loading="lazy" decoding="async" />
      <div>
        <OperationLabel>Meet your usual suspects</OperationLabel>
        <h2>{team.name.toUpperCase()}</h2>
        <p>“{SITE.teamTagline}”</p>
        <p><Link to={`teams/${team.slug}/`}>Read the dossier →</Link></p>
      </div>
      <span className="classified-stamp" aria-hidden="true">UP TO<br />NO GOOD</span>
    </section>
  );
}
