import { formatPartyDate } from '../../lib/model.js';
import { useUrl } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { Caption } from '../ui/Caption.jsx';

const UNITS = ['days', 'hours', 'minutes', 'seconds'];

/** Party countdown. public/scripts/countdown.js fills the numbers; the sentence below works without JavaScript. */
export function Countdown({ countdown }) {
  const url = useUrl();
  return (
    <section className="countdown" aria-labelledby="countdown-heading" data-target={countdown.target}>
      <OperationLabel>{countdown.label} countdown</OperationLabel>
      <h2 id="countdown-heading" className="countdown-title">Time is running out.</h2>
      <p className="countdown-clock" aria-hidden="true">
        {UNITS.map(unit => <span key={unit}><b data-unit={unit}>--</b><small>{unit}</small></span>)}
      </p>
      <p>The {countdown.label} is <time dateTime={countdown.target}><strong>{formatPartyDate(countdown)}</strong></time> ({countdown.timeZone}). Every day that slips by is one fewer chance to prank a team and bribe your way to a witch. The witches have all the time in the world. You do not.</p>
      <Caption>Pranks and photos must be posted by October 22 to earn points.</Caption>
      <script src={url('scripts/countdown.js')} defer />
    </section>
  );
}
