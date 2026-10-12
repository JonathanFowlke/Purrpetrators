import { Img } from '../../lib/site.jsx';
import { SITE } from '../../lib/constants.js';

/** PNN lettering and brand line at the top of a printed flier. */
export function PrintBrand() {
  return (
    <>
      <Img className="flier-logo" src="assets/images/pnn.svg" width="300" height="110" alt="PNN — Purrpetrator News Network" />
      <p className="flier-brandline">{SITE.brandLine}</p>
    </>
  );
}
