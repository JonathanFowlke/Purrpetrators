import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { Hero } from '../components/home/Hero.jsx';
import { FeaturedCase } from '../components/home/FeaturedCase.jsx';
import { Countdown } from '../components/home/Countdown.jsx';
import { DailyTip } from '../components/home/DailyTip.jsx';
import { PurrIndex } from '../components/home/PurrIndex.jsx';
import { NewsletterPreview } from '../components/home/NewsletterPreview.jsx';
import { TeamSpotlight } from '../components/home/TeamSpotlight.jsx';
import { Callout } from '../components/ui/Callout.jsx';
import { HotlineInline } from '../components/ui/HotlineInline.jsx';
import { useSite } from '../lib/site.jsx';

export function HomePage() {
  const { model } = useSite();
  const ourTeam = model.teams.find(team => team.isOurTeam);
  const latestEdition = [...model.newsletters].reverse().find(item => item.status === 'published')?.id;
  const seriesStart = model.latest?.series && model.caseById.get(model.latest.series.startCaseId);
  const series = seriesStart?.published && seriesStart.id !== model.latest.id ? { ...model.latest.series, start: seriesStart } : null;
  return (
    <SiteLayout
      isHome
      title="PNN — Purrpetrator News Network"
      description="Neighborhood intelligence. Questionable conclusions. Follow the Prowling Purrpetrators' case files and reports from the Broomstick Challenge."
      og={{ type: 'website', title: 'PNN — Purrpetrator News Network', description: 'The Purrveillance desk is open. Case files and questionable conclusions from the Broomstick Challenge.', path: '/', siteName: 'Purrpetrator News Network' }}
    >
      <Hero>
        <FeaturedCase record={model.latest} team={model.latest && model.teamById.get(model.latest.suspectTeamId)} series={series} />
      </Hero>
      <Countdown countdown={model.countdown} />
      <DailyTip {...model.dailyTip} />
      <PurrIndex {...model.index} />
      <Callout id="tip-teaser-heading" label="PNN Tip Line · Inspector Clueso's office" title="Help Clueso catch the pink team." tip action={{ to: 'tips/', label: 'Submit a tip & evidence →' }}>
        <p>Seen the Prowling Purrpetrators at work? Send game reports, photos, or a short clip. Clueso has a theory. Some facts would be useful. Suspicious laundry also welcome; it has become a hobby of his. Every tip gets a human review before publication.</p>
        <HotlineInline />
      </Callout>
      {latestEdition ? <NewsletterPreview latestEdition={latestEdition} /> : null}
      <TeamSpotlight team={ourTeam} />
    </SiteLayout>
  );
}
