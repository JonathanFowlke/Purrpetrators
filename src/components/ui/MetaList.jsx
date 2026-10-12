/** Definition list of key facts shown under a case or dossier heading. */
export function MetaList({ items }) {
  return (
    <dl className="case-meta">
      {items.map(item => <div key={item.term}><dt>{item.term}</dt><dd>{item.value}</dd></div>)}
    </dl>
  );
}
