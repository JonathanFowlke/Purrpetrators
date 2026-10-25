// Story fixtures built from the real data files, through the same buildModel the site build uses,
// so stories cannot drift from the data. Components themselves never import data.
import cases from '../data/cases.json';
import teams from '../data/teams.json';
import bonuses from '../data/purr-hiss-bonuses.json';
import tickerPool from '../data/news-ticker.json';
import dossiers from '../data/team-dossiers.json';
import countdown from '../data/countdown.json';
import dailyTips from '../data/daily-tips.json';
import tipLine from '../data/tip-line.json';
import subscribe from '../data/newsletter-subscribe.json';
import cards from '../data/cards.json';
import finalResults from '../data/final-results.json';
import edition001 from '../data/newsletters/001.json';
import { buildModel } from '../src/lib/model.js';

export const model = buildModel(
  { cases, teams, bonuses, tickerPool, dossiers, countdown, dailyTips, tipLine, subscribe, cards, newsletters: [edition001], emailTemplate: '', finalResults },
  new Date('2026-10-11T12:00:00-06:00')
);

const evidence = cases.flatMap(record => record.evidence);
export const videoEvidence = evidence.find(item => item.type === 'video');
export const imageEvidence = evidence.find(item => item.type === 'image' && !item.reconstruction) || evidence.find(item => item.type === 'image');
export const reconstructedImage = evidence.find(item => item.type === 'image' && item.reconstruction);
export const reportEvidence = evidence.find(item => item.type === 'report');
export const caseWithNotice = cases.find(record => record.organizerNotice);
export const caseWithRatings = cases.find(record => record.purrHiss);
export const ourTeam = teams.find(team => team.isOurTeam);
export const otherTeam = teams.find(team => !team.isOurTeam);
