import { Img, useUrl } from '../../lib/site.jsx';
import { Inline } from '../../lib/prose.jsx';
import { FrameLabel } from '../ui/FrameLabel.jsx';
import { Redacted, hashText } from '../ui/Redacted.jsx';

const sourceTag = item => (item.type === 'image' && !item.reconstruction ? 'Supplied game material' : 'PNN reconstruction');

/** One exhibit in a case file: a witness report, supplied image, or video (clearly labeled when it is a reconstruction). */
export function Evidence({ item, index }) {
  const url = useUrl();
  if (item.type === 'report') {
    return (
      <figure className="case-evidence">
        <FrameLabel title={item.label} tag="Witness report" />
        <p className="witness-source">Source: <Redacted seed={hashText(item.id)} /> (identity withheld)</p>
        <p><Inline text={item.description} /></p>
        <figcaption className="case-caption"><Inline text={item.caption} /></figcaption>
      </figure>
    );
  }
  const describedBy = `evidence-${index}-description`;
  return (
    <figure className="case-evidence">
      <FrameLabel title={item.label} tag={sourceTag(item)} />
      {item.type === 'image'
        ? <Img src={item.src} width={item.width} height={item.height} alt={item.alt} aria-describedby={describedBy} loading="lazy" decoding="async" />
        : (
          <video controls playsInline preload="none" poster={url(item.poster)} width="640" height="360" aria-label={item.label} aria-describedby={describedBy}>
            <source src={url(item.src)} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        )}
      <figcaption>
        <p id={describedBy}><Inline text={item.description} /></p>
        <p className="case-caption"><Inline text={item.caption} /></p>
        <a href={url(item.src)}>Open {item.type === 'image' ? 'image' : 'video'} directly</a>
      </figcaption>
    </figure>
  );
}
