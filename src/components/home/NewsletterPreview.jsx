import { Img } from '../../lib/site.jsx';
import { HomeLink } from '../ui/HomeLink.jsx';
import { OperationLabel } from '../ui/OperationLabel.jsx';

/** Homepage newsletter promo. */
export function NewsletterPreview({ latestEdition }) {
  return (
    <section className="newsletter-preview newsletter-home" aria-labelledby="newsletter-heading">
      <div>
        <OperationLabel>PNN Newsletter · Edition {latestEdition} now published</OperationLabel>
        <h2 id="newsletter-heading">Mischief. In your inbox.</h2>
        <p>Case teasers. Questionable motives. Scorched laundry, spider puns, and Inspector Clueso, who would like a word. Read the first edition, then subscribe so the next one reaches you before Clueso does.</p>
        <HomeLink to="newsletter/">Read the newsletter →</HomeLink>
      </div>
      <Img src="assets/images/pnn.png" width="900" height="330" alt="Purrpetrator News Network lettering" loading="lazy" decoding="async" />
    </section>
  );
}
