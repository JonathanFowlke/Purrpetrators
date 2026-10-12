/** Bordered top label: a bold title on the left and a source tag on the right. */
export function FrameLabel({ title, tag }) {
  return <div className="frame-label top-label"><strong>{title}</strong><span>{tag}</span></div>;
}
