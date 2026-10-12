import { PrintBrand } from './PrintBrand.jsx';
import { WindshieldCard } from './WindshieldCard.jsx';
import { model } from '../../../.storybook/fixtures.js';

export default { title: 'Print/Pieces', parameters: { layout: 'padded' } };

export const Brand = { render: () => <div className="print-flier"><header><PrintBrand /></header></div> };
export const Card = { render: () => <div className="card-sheet"><WindshieldCard card={model.cards.sheets[0].cards[0]} /></div> };
export const Sheet = { render: () => <div className="card-sheet">{model.cards.sheets[0].cards.map(card => <WindshieldCard key={card.title} card={card} />)}</div> };
