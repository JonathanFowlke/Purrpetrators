import { Fragment } from 'react';
import { Link, useSite } from './site.jsx';
import { Redacted, hashText } from '../components/ui/Redacted.jsx';

// Light authoring markup for case text: **bold**, *italic*, "- " bullet lines, and "> " quote lines
// (a final "> — name" line becomes the attribution), and [[redacted]] or [[redacted:8]] (about 8 characters wide)
// for a black-marker blackout wherever a person's name or identifying detail would appear.

/** Split text into plain/bold/italic segments. */
function parseInline(value) {
  const parts = String(value).split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/);
  const segments = parts.filter(Boolean).map(part => {
    if (/^\*\*[^*\n]+\*\*$/.test(part)) return { wrap: 'strong', pieces: [part.slice(2, -2)] };
    if (/^\*[^*\n]+\*$/.test(part)) return { wrap: 'em', pieces: [part.slice(1, -1)] };
    return { wrap: null, pieces: [part] };
  });
  splitRedactions(segments, hashText(value));
  return segments;
}

// Turns each [[redacted]] / [[redacted:N]] into a { redact } piece. The seed (text hash + running count) gives each bar a different width.
function splitRedactions(segments, seed) {
  let count = 0;
  for (const segment of segments) {
    segment.pieces = segment.pieces[0].split(/(\[\[redacted(?::\d+)?\]\])/i).filter(Boolean).map(chunk => {
      const match = chunk.match(/^\[\[redacted(?::(\d+))?\]\]$/i);
      if (!match) return chunk;
      count += 1;
      return { redact: { seed: seed + count * 5, chars: match[1] ? Number(match[1]) : undefined } };
    });
  }
}

// Links the first mention of each team (except selfId) per text row; each field shares one `linked` set.
function linkTeams(segments, linked, { teams, selfId, to }) {
  for (const team of teams) {
    if (team.id === selfId || linked.has(team.id)) continue;
    for (const segment of segments) {
      const at = segment.pieces.findIndex(piece => typeof piece === 'string' && piece.includes(team.name));
      if (at < 0) continue;
      const piece = segment.pieces[at];
      const i = piece.indexOf(team.name);
      segment.pieces.splice(at, 1, piece.slice(0, i), { team }, piece.slice(i + team.name.length));
      linked.add(team.id);
      break;
    }
  }
}

function linkCaseNumbers(segments, caseById) {
  for (const segment of segments) {
    segment.pieces = segment.pieces.flatMap(piece => {
      if (typeof piece !== 'string') return [piece];
      return piece.split(/(PNN-\d{3})/).map(chunk => {
        const match = chunk.match(/^PNN-(\d{3})$/);
        const record = match && caseById.get(match[1]);
        return record && record.published ? { caseNumber: chunk, id: match[1] } : chunk;
      });
    });
  }
}

function renderSegments(segments) {
  return segments.map((segment, i) => {
    const children = segment.pieces.map((piece, j) => {
      if (typeof piece === 'string') return <Fragment key={j}>{piece}</Fragment>;
      if (piece.redact) return <Redacted key={j} {...piece.redact} />;
      if (piece.team) return <Link key={j} className="team-link" to={`teams/${piece.team.slug}/`}>{piece.team.name}</Link>;
      return <Link key={j} to={`cases/${piece.id}/`}>{piece.caseNumber}</Link>;
    });
    if (segment.wrap === 'strong') return <strong key={i}>{children}</strong>;
    if (segment.wrap === 'em') return <em key={i}>{children}</em>;
    return <Fragment key={i}>{children}</Fragment>;
  });
}

function buildLinker({ teams, caseNumbers, selfId, caseById }) {
  const linked = new Set();
  return text => {
    const segments = parseInline(text);
    if (teams) linkTeams(segments, linked, { teams, selfId });
    if (caseNumbers) linkCaseNumbers(segments, caseById);
    return renderSegments(segments);
  };
}

function useLinker({ linkTeams: teamLinks, caseNumbers, selfId }) {
  const { model } = useSite();
  return buildLinker({
    teams: teamLinks && model ? model.teamsByNameLength : null,
    caseNumbers: caseNumbers && model,
    selfId,
    caseById: model && model.caseById
  });
}

/** One line of text with bold or italic markup and optional team / case-number links. */
export function Inline({ text, linkTeams: teamLinks = false, caseNumbers = false, selfId }) {
  const render = useLinker({ linkTeams: teamLinks, caseNumbers, selfId });
  return <>{render(text)}</>;
}

/** Multi-paragraph authoring text: blank lines split blocks; "> " becomes a quote and "- " a bullet list. */
export function Prose({ text, linkTeams: teamLinks = false, caseNumbers = false, selfId }) {
  const render = useLinker({ linkTeams: teamLinks, caseNumbers, selfId });
  return text.split(/\n{2,}/).map((part, i) => {
    const rows = part.trim().split('\n');
    if (rows.every(row => row.startsWith('> '))) {
      const cite = rows.length > 1 && rows.at(-1).startsWith('> — ') ? rows.pop().slice(4) : '';
      return (
        <blockquote className="case-quote" key={i}>
          {rows.map((row, j) => <p key={j}>{render(row.slice(2))}</p>)}
          {cite ? <cite>— {renderSegments(parseInline(cite))}</cite> : null}
        </blockquote>
      );
    }
    if (rows.every(row => row.startsWith('- '))) {
      return <ul className="case-list-items" key={i}>{rows.map((row, j) => <li key={j}>{render(row.slice(2))}</li>)}</ul>;
    }
    return <p key={i}>{render(part.trim())}</p>;
  });
}

/** A bullet list of single-line inline items (used by dossiers). */
export function InlineList({ items, caseNumbers = false }) {
  const render = useLinker({ caseNumbers });
  return <ul className="case-list-items">{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}
