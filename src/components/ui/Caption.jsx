/** Small muted caption line. */
export function Caption({ children, as: Tag = 'p', ...props }) {
  return <Tag className="case-caption" {...props}>{children}</Tag>;
}
