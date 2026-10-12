import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Ticker } from './Ticker.jsx';
import { SiteProvider } from '../../lib/site.jsx';
import { model } from '../../../.storybook/fixtures.js';

export default { title: 'Layout/Chrome' };

export const MastheadHome = { render: () => <Header /> };
export const MastheadTipsActive = { render: () => <Header current="tips" /> };
export const FooterHome = { render: () => <Footer isHome /> };
export const FooterInner = { render: () => <Footer /> };
// Storybook does not serve data/, so ticker.js keeps the static headlines here.
export const NewsTicker = { render: () => <Ticker {...model.ticker} /> };
export const NestedPageLinks = {
  name: 'Header one level deep (relative links)',
  render: () => <SiteProvider file="cases/index.html" model={model}><Header current="cases" /></SiteProvider>
};
