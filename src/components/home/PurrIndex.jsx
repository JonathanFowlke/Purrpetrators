import { Img, useUrl } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { Caption } from '../ui/Caption.jsx';
import { TeamName } from '../ui/TeamName.jsx';
import { standingText } from '../team/standing.js';

function rowNote(row) {
  if (row.rated) return row.note;
  return row.team.isOurTeam
    ? 'Suspiciously clean. Clueso considers an empty record the most incriminating kind.'
    : 'No case file yet. Suspiciously quiet.';
}

function PurrRow({ row, scale }) {
  const { team } = row;
  const pct = value => `${Math.round(value / scale * 100)}%`;
  return (
    <li className="purr-row" data-team={team.id}>
      <Img src={team.logo} width="56" height="56" alt="" loading="lazy" decoding="async" />
      <div className="purr-main">
        <div className="purr-name"><strong><TeamName team={team} /></strong><span>{standingText(row)}</span></div>
        <div className="purr-bar" role="img" aria-label={`${team.name}: ${row.hisses} hairballs, ${row.purrs} catnip`}>
          <span className="purr-half purr-left"><i style={{ width: pct(row.hisses) }} /></span>
          <span className="purr-half purr-right"><i style={{ width: pct(row.purrs) }} /></span>
        </div>
        <Caption>{rowNote(row)}</Caption>
      </div>
    </li>
  );
}

/** The Catnip & Hairball Index. Totals are exact static text; public/scripts/catnip-index.js shuffles and animates the bars. */
export function PurrIndex({ rows, scale }) {
  const url = useUrl();
  return (
    <section className="purr-index" aria-labelledby="catnip-index-heading">
      <div className="purr-index-head">
        <OperationLabel>Clueso's running tally</OperationLabel>
        <h2 id="catnip-index-heading">The Catnip &amp; Hairball Index</h2>
        <p>Who got the catnip. Who coughed up the hairball. Every case file adds to the tally: <strong>catnip</strong> for clever, well-run mischief, <strong>hairballs</strong> for hot air, bad timing, and laundry catastrophes.</p>
        <Caption>Comedy ratings from PNN's desk, summed from each case file. Not game points, standings, or votes. The witches decide the real winners. The numbers are exact. The bars drift a little each day with Clueso's mood.</Caption>
      </div>
      <div className="purr-legend" aria-hidden="true"><span>← Hairballs</span><span>Catnip →</span></div>
      <ul className="purr-rows">{rows.map(row => <PurrRow key={row.team.id} row={row} scale={scale} />)}</ul>
      <script src={url('scripts/catnip-index.js')} defer />
    </section>
  );
}
