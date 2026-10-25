import { formatPartyDate } from '../../lib/model.js';
import { useUrl } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { Caption } from '../ui/Caption.jsx';
import { TeamName } from '../ui/TeamName.jsx';

const UNITS = ['days', 'hours', 'minutes', 'seconds'];

function Clock() {
  return (
    <p className="countdown-clock" aria-hidden="true">
      {UNITS.map(unit => <span key={unit}><b data-unit={unit}>--</b><small>{unit}</small></span>)}
    </p>
  );
}

/**
 * Party countdown, or, once final results exist, a count-up from the moment the champions were decided.
 * public/scripts/countdown.js fills the numbers; the sentence below works without JavaScript.
 */
export function Countdown({ countdown, results }) {
  const url = useUrl();
  if (results) {
    const champion = results.standings[0].team;
    const decided = { target: results.decidedAt, timeZone: results.timeZone };
    return (
      <section className="countdown is-count-up" aria-labelledby="countdown-heading" data-since={results.decidedAt}>
        <OperationLabel>Reign clock · counting up</OperationLabel>
        <h2 id="countdown-heading" className="countdown-title">The countdown is over. The reign has begun.</h2>
        <Clock />
        <p>The {countdown.label} countdown ran out at <time dateTime={countdown.target}>{formatPartyDate(countdown)}</time>. The <TeamName team={champion} /> were declared 2026 Broomstick Challenge champions at <time dateTime={results.decidedAt}><strong>{formatPartyDate(decided)}</strong></time> ({results.timeZone}). The clock now runs the other way. Clueso has asked it to stop. It has not.</p>
        <Caption>Time since the trophies went pink. Next season's rules, dates, and teams are up to the witches.</Caption>
        <script src={url('scripts/countdown.js')} defer />
      </section>
    );
  }
  return (
    <section className="countdown" aria-labelledby="countdown-heading" data-target={countdown.target}>
      <OperationLabel>{countdown.label} countdown</OperationLabel>
      <h2 id="countdown-heading" className="countdown-title">Time is running out.</h2>
      <Clock />
      <p>The {countdown.label} is <time dateTime={countdown.target}><strong>{formatPartyDate(countdown)}</strong></time> ({countdown.timeZone}). Every day that slips by is one fewer chance to prank a team and bribe your way to a witch. The witches have all the time in the world. You do not.</p>
      <Caption>Pranks and photos must be posted by October 22 to earn points.</Caption>
      <script src={url('scripts/countdown.js')} defer />
    </section>
  );
}
