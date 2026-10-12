import { Prose, Inline } from './prose.jsx';

export default { title: 'Lib/Prose', parameters: { layout: 'padded' } };

const SAMPLE = `The **Pyro Posse** hung laundry on the Tightie Whities. *Allegedly.* Clueso suspects the Prowling Purrpetrators.

> Nobody else is playing.
> — The Pyro Posse

- First bullet, mentions PNN-004
- Second bullet`;

export const AuthoringMarkup = { render: () => <Prose text={SAMPLE} linkTeams caseNumbers /> };
export const PlainWithoutLinks = { render: () => <Prose text={SAMPLE} /> };
export const OneLine = { render: () => <p><Inline text="A **bold** claim and an *italic* retraction." /></p> };
