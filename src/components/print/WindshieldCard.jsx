import { Img } from '../../lib/site.jsx';

/** One business-size windshield card with the dispatch QR code. */
export function WindshieldCard({ card }) {
  return (
    <article className="windshield-card">
      <header><Img src="assets/images/pnn.svg" width="300" height="110" alt="PNN" /><span>Wanted everywhere,<br />caught nowhere.</span></header>
      <h3>{card.title}</h3>
      <div className="card-message"><p>{card.message}</p><Img className="card-qr" src="assets/qr/pnn-dispatch-qr.svg" width="450" height="450" alt="PNN QR code" /></div>
      <p className="card-context">Broomstick Challenge · Fictional neighborhood news.<br />No ticket. No fine. Just a little mischief.</p>
    </article>
  );
}
