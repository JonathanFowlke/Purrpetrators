import { Img, Link } from '../../lib/site.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';
import { FrameLabel } from '../ui/FrameLabel.jsx';
import { Caption } from '../ui/Caption.jsx';
import { CaseTime } from '../ui/Time.jsx';

/**
 * Homepage feature for the newest published case, with its first image or video poster when there is one.
 * `series` ({ name, blurb, start }) adds a link back to the first case when the newest case is part of a run.
 */
export function FeaturedCase({ record, team, series }) {
  if (!record) return <p className="intro">No open files. Suspiciously quiet.</p>;
  const media = record.evidence.find(item => item.type === 'image' || item.type === 'video');
  const to = `cases/${record.id}/`;
  return (
    <article className="featured-case" aria-labelledby="featured-case-heading">
      <FrameLabel title="Latest case file" tag={record.caseNumber} />
      {media ? (
        <Link to={to} tabIndex={-1} aria-hidden="true">
          <Img className="featured-case-image" src={media.type === 'image' ? media.src : media.poster} width={media.type === 'image' ? media.width : 640} height={media.type === 'image' ? media.height : 360} alt="" fetchPriority="high" />
        </Link>
      ) : null}
      <OperationLabel>{record.status} · {team.name}</OperationLabel>
      <h2 id="featured-case-heading"><Link to={to}>{record.incidentTitle}</Link></h2>
      <p>{record.summary}</p>
      <Caption><CaseTime record={record} /></Caption>
      {series ? (
        <Caption><strong>{series.name}:</strong> {series.blurb} <Link to={`cases/${series.start.id}/`}>Start at {series.start.caseNumber} →</Link></Caption>
      ) : null}
      <Link className="featured-case-link" to={to}>{media ? `Read the case & ${media.type === 'image' ? 'view' : 'watch'} the evidence` : 'Read the case & witness report'} →</Link>
    </article>
  );
}
