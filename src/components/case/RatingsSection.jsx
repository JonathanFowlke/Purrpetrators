import { Link } from '../../lib/site.jsx';
import { Caption } from '../ui/Caption.jsx';
import { TeamName } from '../ui/TeamName.jsx';

/** Per-case Catnip & Hairball ratings with the comedy-not-points disclaimer. */
export function RatingsSection({ ratings, teamById }) {
  return (
    <section className="case-ratings">
      <h2>Catnip &amp; Hairball ratings</h2>
      <ul className="case-list-items">
        {ratings.map(r => (
          <li key={r.teamId}><strong><TeamName team={teamById.get(r.teamId)} />:</strong> {r.purrs} catnip, {r.hisses} hairballs. {r.note}</li>
        ))}
      </ul>
      <Caption>Comedy ratings from Inspector Clueso's desk, 0 to 5 each. Not game points or standings. <Link to="index.html#catnip-index-heading">See the running Catnip &amp; Hairball Index.</Link></Caption>
    </section>
  );
}
