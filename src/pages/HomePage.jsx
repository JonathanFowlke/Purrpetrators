import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { Hero } from '../components/home/Hero.jsx';
import { FeaturedCase } from '../components/home/FeaturedCase.jsx';
import { Countdown } from '../components/home/Countdown.jsx';
import { FinalResults } from '../components/home/FinalResults.jsx';
import { DailyTip } from '../components/home/DailyTip.jsx';
import { PurrIndex } from '../components/home/PurrIndex.jsx';
import { NewsletterPreview } from '../components/home/NewsletterPreview.jsx';
import { TeamSpotlight } from '../components/home/TeamSpotlight.jsx';
import { Callout } from '../components/ui/Callout.jsx';
import { HotlineInline } from '../components/ui/HotlineInline.jsx';
import { useSite } from '../lib/site.jsx';
import { suspectTeamsOf } from '../lib/model.js';

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
        <FeaturedCase record={model.latest} teams={model.latest && suspectTeamsOf(model.latest, model.teamById)} series={series} />
      </Hero>
      {model.finalResults ? <FinalResults results={model.finalResults} /> : null}
      <Countdown countdown={model.countdown} results={model.finalResults} />
      <DailyTip {...model.dailyTip} />
      <PurrIndex {...model.index} />
      <Callout id="tip-teaser-heading" label="PNN Tip Line · Inspector Clueso's office" title="The season is over. Clueso is not." tip action={{ to: 'tips/', label: 'Submit a tip & evidence →' }}>
        <p>The scores are locked and the trophies are pink, but Clueso's case against the Prowling Purrpetrators remains open. Send game stories, party photos, or the scavenger hunt moment you are still laughing about. Suspicious laundry also welcome; it has become a hobby of his. Every tip gets a human review before publication.</p>
        <HotlineInline />
      </Callout>
      {latestEdition ? <NewsletterPreview latestEdition={latestEdition} /> : null}
      <TeamSpotlight team={ourTeam} />
    </SiteLayout>
  );
}
