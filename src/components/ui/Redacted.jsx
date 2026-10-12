// Widths in em, so a bar scales with the text around it. They read as different-length names, titles, and numbers.
export const REDACTED_WIDTHS = [5.6, 7.4, 6.2, 9.8, 6.8, 11.4, 5.2, 8.4, 6.4, 10.4, 5, 8];

/** Deterministic pick so a rebuild never reshuffles bars; `seed` varies neighbors, `chars` forces a width. */
export function redactedWidth(seed = 0, chars) {
  if (chars) return Math.round((chars * 0.6 + 0.4) * 10) / 10;
  return REDACTED_WIDTHS[Math.abs(seed) % REDACTED_WIDTHS.length];
}

export function hashText(value) {
  let h = 7;
  for (const ch of String(value)) h = (h * 31 + ch.codePointAt(0)) | 0;
  return Math.abs(h);
}

/** A black-marker blackout for anything that would name or identify a person. The word stays in the DOM, barely visible. */
export function Redacted({ seed = 0, chars }) {
  return (
    <span className="redacted" style={{ '--redacted-w': `${redactedWidth(seed, chars)}em` }}>
      <span>REDACTED</span>
    </span>
  );
}
