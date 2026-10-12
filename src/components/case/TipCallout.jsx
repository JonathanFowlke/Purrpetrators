import { Callout } from '../ui/Callout.jsx';
import { HotlineInline } from '../ui/HotlineInline.jsx';
import { Link } from '../../lib/site.jsx';

/** Closing Tip Line prompt shown at the bottom of every case file. */
export function CaseTipCallout() {
  return (
    <Callout id="case-tip-heading" label="PNN Tip Line · Inspector Clueso's office" title="Clueso has a theory. Have any facts?" tip action={{ to: 'tips/', label: 'File a field report →' }}>
      <p>Help build the case against the Prowling Purrpetrators. Send game reports, approved photos, or corrections to Inspector Clueso's office. All teams' mischief is welcome.</p>
      <HotlineInline>Think PNN got it wrong? The <Link to="corrections/">Corrections Desk</Link> is open.</HotlineInline>
    </Callout>
  );
}
