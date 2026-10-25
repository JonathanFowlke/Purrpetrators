import { Img, Link } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { TeamName } from '../ui/TeamName.jsx';

const ordinal = rank => ['1st', '2nd', '3rd'][rank - 1] || `${rank}th`;

const listNames = teams => teams.map((team, i) => (
  <span key={team.id}>{i ? (i === teams.length - 1 ? ' and ' : ', ') : ''}<TeamName team={team} /></span>
));

function StandingRow({ row, base, top }) {
  const pct = value => `${(value / top * 100).toFixed(1)}%`;
  return (
    <li className="results-row" data-team={row.team.id} data-rank={row.rank}>
      <span className="results-rank">{row.tied ? 'T-' : ''}{ordinal(row.rank)}</span>
      <Img src={row.team.logo} width="56" height="56" alt="" loading="lazy" decoding="async" />
      <div className="results-main">
        <div className="results-name"><strong><TeamName team={row.team} /></strong><span className="results-points">{row.points}<small> pts</small></span></div>
        <div className="results-bar" role="img" aria-label={`${row.team.name}: ${row.points} points, ${base} from the game and ${row.points - base} from votes and bonuses`}>
          <i className="results-base" style={{ width: pct(base) }} />
          <i className="results-bonus" style={{ width: pct(row.points - base) }} />
        </div>
        <p className="results-note">{row.note}</p>
      </div>
    </li>
  );
}

/** The final scoreboard: standings with shared ranks, the base-versus-bonus split, and each voted category. */
export function FinalResults({ results }) {
  const [champion] = results.standings;
  const base = results.basePoints.points;
  return (
    <section className="final-results" aria-labelledby="final-results-heading">
      <div className="results-head">
        <OperationLabel>Official results · {results.title.replace(/ final results$/i, '')}</OperationLabel>
        <h2 id="final-results-heading">Final results. Case closed.</h2>
        <p>The witches counted. The neighborhood voted. <strong>PNN only reports it.</strong></p>
      </div>
      <div className="results-champion">
        <Img src={champion.team.logo} width="96" height="96" alt="" decoding="async" />
        <div>
          <p className="results-kicker">2026 Broomstick Challenge Champions</p>
          <p className="results-champion-name"><TeamName team={champion.team} /></p>
          <p className="results-champion-points">{champion.points} points. Wanted everywhere, caught nowhere, <em>except on the podium.</em></p>
        </div>
        <span className="results-stamp" aria-hidden="true">GUILTY<br />AS CHARGED</span>
      </div>
      <div className="results-legend" aria-hidden="true"><span><i className="results-base" />Game points</span><span><i className="results-bonus" />Votes and bonuses</span></div>
      <ol className="results-rows">{results.standings.map(row => <StandingRow key={row.team.id} row={row} base={base} top={results.top} />)}</ol>
      <h3 className="results-awards-heading">Category winners</h3>
      <ul className="results-awards">
        {results.awards.map(award => (
          <li key={award.category}>
            <span className="results-award-category">{award.category}{award.teams.length > 1 ? <b> · Tie</b> : null}</span>
            <span className="results-award-winner">{listNames(award.teams)}</span>
          </li>
        ))}
      </ul>
      <p className="results-footnote">{results.basePoints.note} Congratulations to all seven teams, and thank you to Wanda, Hilda, and Glenda for a pranking good season.</p>
      <p className="results-link"><Link to={`cases/${results.caseId}/`}>Read the final case file →</Link></p>
    </section>
  );
}
