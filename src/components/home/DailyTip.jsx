import { useUrl } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';

/** Daily Tip-Off. The tip list is embedded as JSON; public/scripts/daily-tip.js swaps in a different tip each local day. */
export function DailyTip({ tips, fallback }) {
  const url = useUrl();
  return (
    <section className="daily-tip" aria-labelledby="daily-tip-heading">
      <OperationLabel>Clueso's Daily Tip-Off · <span id="daily-tip-topic">{fallback.topic}</span></OperationLabel>
      <h2 id="daily-tip-heading">Today's tip from Inspector Clueso</h2>
      <p className="daily-tip-text" id="daily-tip-text">{fallback.text}</p>
      <script type="application/json" id="daily-tips-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(tips).replace(/</g, '\\u003c') }} />
      <script src={url('scripts/daily-tip.js')} defer />
    </section>
  );
}
