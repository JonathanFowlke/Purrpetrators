import { formatCaseDate } from '../../lib/model.js';

/** A case's opening timestamp as a <time> element in its own time zone. */
export function CaseTime({ record }) {
  return <time dateTime={record.dateOpened}>{formatCaseDate(record)}</time>;
}
