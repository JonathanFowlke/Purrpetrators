/** Small magenta kicker line used above most headings. */
export function OperationLabel({ children, as: Tag = 'p', ...props }) {
  return <Tag className="operation-label" {...props}>{children}</Tag>;
}
