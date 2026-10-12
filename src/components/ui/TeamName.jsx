import { Link } from '../../lib/site.jsx';

/** A team's name linking to its dossier. */
export function TeamName({ team, children }) {
  return <Link className="team-link" to={`teams/${team.slug}/`}>{children || team.name}</Link>;
}
