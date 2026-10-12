import { Dossier } from './Dossier.jsx';
import { TeamCard } from './TeamCard.jsx';
import { TeamPanel } from './TeamPanel.jsx';
import { model, ourTeam, otherTeam } from '../../../.storybook/fixtures.js';

export default { title: 'Team/Dossier', parameters: { layout: 'padded' } };

export const OurTeamDossier = { render: () => <main className="case-main"><Dossier team={ourTeam} /></main> };
export const OtherTeamDossier = { render: () => <main className="case-main"><Dossier team={otherTeam} /></main> };
export const Card = { render: () => <div className="team-grid"><TeamCard team={otherTeam} dossier={model.dossiers[otherTeam.id]} row={model.index.totals.get(otherTeam.id)} /></div> };
export const Panel = { render: () => <TeamPanel team={ourTeam} label={`Team color · ${ourTeam.color}`} heading={ourTeam.name}><p>The suspect Clueso cannot catch.</p></TeamPanel> };
