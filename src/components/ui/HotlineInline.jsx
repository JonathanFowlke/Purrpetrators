import { HOTLINE } from '../../lib/constants.js';

/** "Or call +1 (801) 79-PRANK." line. Extra content (such as a Corrections link) follows the call text. */
export function HotlineInline({ children }) {
  return (
    <p className="hotline-inline">
      Or call <a href={HOTLINE.tel} aria-label={HOTLINE.aria}>{HOTLINE.vanity}</a>.{children ? <> {children}</> : null}
    </p>
  );
}
