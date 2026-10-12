import { Caption } from '../ui/Caption.jsx';

/** Quoted organizer instructions, kept visually distinct from PNN's comic interpretation. */
export function OrganizerNotice({ notice }) {
  return (
    <section className="organizer-notice">
      <h2>The witches' reminder</h2>
      <Caption>{notice.attribution} · {notice.timeLabel}</Caption>
      <blockquote>{notice.paragraphs.map((text, i) => <p key={i}>{text}</p>)}</blockquote>
    </section>
  );
}
