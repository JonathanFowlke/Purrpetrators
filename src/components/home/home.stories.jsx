import { Countdown } from './Countdown.jsx';
import { DailyTip } from './DailyTip.jsx';
import { FeaturedCase } from './FeaturedCase.jsx';
import { Hero } from './Hero.jsx';
import { NewsletterPreview } from './NewsletterPreview.jsx';
import { PurrIndex } from './PurrIndex.jsx';
import { TeamSpotlight } from './TeamSpotlight.jsx';
import { suspectTeamsOf } from '../../lib/model.js';
import { model, ourTeam } from '../../../.storybook/fixtures.js';

export default { title: 'Home/Sections', parameters: { layout: 'padded' } };

export const HeroWithFeaturedCase = {
  render: () => <Hero><FeaturedCase record={model.latest} teams={suspectTeamsOf(model.latest, model.teamById)} /></Hero>
};
export const FeaturedCaseOnly = { render: () => <FeaturedCase record={model.latest} teams={suspectTeamsOf(model.latest, model.teamById)} /> };
export const NoCases = { render: () => <FeaturedCase record={undefined} /> };
export const PartyCountdown = { parameters: { scripts: ['scripts/countdown.js'] }, render: () => <Countdown countdown={model.countdown} /> };
export const TipOfTheDay = { parameters: { scripts: ['scripts/daily-tip.js'] }, render: () => <DailyTip {...model.dailyTip} /> };
export const CatnipAndHairballIndex = { parameters: { scripts: ['scripts/catnip-index.js'] }, render: () => <PurrIndex {...model.index} /> };
export const Newsletter = { render: () => <NewsletterPreview latestEdition="001" /> };
export const OurTeam = { render: () => <TeamSpotlight team={ourTeam} /> };
