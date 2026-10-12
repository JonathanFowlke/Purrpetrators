import { HomePage } from './pages/HomePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { CasesIndexPage } from './pages/CasesIndexPage.jsx';
import { CasePage } from './pages/CasePage.jsx';
import { TeamsIndexPage } from './pages/TeamsIndexPage.jsx';
import { TeamPage } from './pages/TeamPage.jsx';
import { TipsPage } from './pages/TipsPage.jsx';
import { TipFlierPage } from './pages/TipFlierPage.jsx';
import { CorrectionsPage } from './pages/CorrectionsPage.jsx';
import { NewsletterIndexPage } from './pages/NewsletterIndexPage.jsx';
import { DispatchPage } from './pages/DispatchPage.jsx';
import { ResourcesPage } from './pages/ResourcesPage.jsx';
import { PrankedPage } from './pages/PrankedPage.jsx';
import { CardsPage } from './pages/CardsPage.jsx';
import { renderNewsletter } from './email/newsletter.js';

/**
 * Every public file the site produces, as `{ file, element }` for React pages or `{ file, html }` for
 * standalone documents (the email edition). `file` is the output path, and is the URL printed on QR codes,
 * so existing paths must not change. Only published cases get pages; drafts are not rendered.
 */
export function getRoutes(model) {
  return [
    { file: 'index.html', element: <HomePage /> },
    { file: '404.html', element: <NotFoundPage /> },
    { file: 'cases/index.html', element: <CasesIndexPage /> },
    ...model.published.map(record => ({ file: `cases/${record.id}/index.html`, element: <CasePage record={record} /> })),
    { file: 'teams/index.html', element: <TeamsIndexPage /> },
    ...model.teams.map(team => ({ file: `teams/${team.slug}/index.html`, element: <TeamPage team={team} /> })),
    { file: 'tips/index.html', element: <TipsPage /> },
    { file: 'tips/flier.html', element: <TipFlierPage /> },
    { file: 'corrections/index.html', element: <CorrectionsPage /> },
    { file: 'newsletter/index.html', element: <NewsletterIndexPage /> },
    ...model.newsletters.map(edition => ({ file: `newsletter/${edition.id}/index.html`, html: renderNewsletter(edition, model.cases, model.emailTemplate) })),
    { file: 'dispatch/index.html', element: <DispatchPage /> },
    { file: 'resources/index.html', element: <ResourcesPage /> },
    { file: 'resources/pranked.html', element: <PrankedPage /> },
    { file: 'resources/cards.html', element: <CardsPage /> }
  ];
}
