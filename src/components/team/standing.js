/** "9 hairballs · 4 catnip" or "Unrated" for a Catnip & Hairball Index row. */
export const standingText = row => (row.rated ? `${row.hisses} hairballs · ${row.purrs} catnip` : 'Unrated');
