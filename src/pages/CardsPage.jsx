import { PrintLayout, PrintButton } from '../components/print/PrintLayout.jsx';
import { WindshieldCard } from '../components/print/WindshieldCard.jsx';
import { useSite } from '../lib/site.jsx';

/** 30 printable windshield cards, ten per letter-size sheet. Card text lives in data/cards.json. */
export function CardsPage() {
  const { model } = useSite();
  return (
    <PrintLayout
      title="PNN Printable Windshield Cards"
      robots="noindex, nofollow"
      styles={['assets/css/cards.css']}
      bodyClassName="cards-page"
      skipLabel="Skip to cards"
      themeColor={null}
      tools={(
        <div className="cards-tools">
          <h1>Cards from the PNN print desk</h1>
          <p>30 different business-size cards (3.5 × 2 inches), ten per sheet on three letter-size pages. Sheet 1: parking commentary and compliments. Sheet 2: compliments and neighborhood notices. Sheet 3: neighborhood notices, followed by six almost-pranked cards for participating teams.</p>
          <PrintButton>Print cards</PrintButton>
          <p>US Letter · portrait · 100% scale · headers and footers off. Print one-sided and cut along the dotted lines. Browser Print works without JavaScript.</p>
          <p>Use removable placement without obstructing visibility. Test a printed QR before distributing.</p>
        </div>
      )}
    >
      <main id="main">
        {model.cards.sheets.map((sheet, i) => (
          <section className="card-batch" aria-labelledby={`batch-${i + 1}`} key={sheet.title}>
            <h2 className="sheet-label" id={`batch-${i + 1}`}>{sheet.title}</h2>
            <div className="card-sheet">{sheet.cards.map(card => <WindshieldCard key={card.title} card={card} />)}</div>
          </section>
        ))}
      </main>
    </PrintLayout>
  );
}
