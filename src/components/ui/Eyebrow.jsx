/** Page eyebrow. `rule` adds the short decorative rule; `badge` adds a status chip. */
export function Eyebrow({ children, rule = false, badge, as: Tag = 'p' }) {
  return (
    <Tag className="eyebrow">
      {rule ? <><span className="small-rule" aria-hidden="true"></span> </> : null}
      {children}
      {badge ? <> <span className="case-badge">{badge}</span></> : null}
    </Tag>
  );
}
