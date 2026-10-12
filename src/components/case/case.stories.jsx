import { CaseFile } from './CaseFile.jsx';
import { Evidence } from './Evidence.jsx';
import { OrganizerNotice } from './OrganizerNotice.jsx';
import { RatingsSection } from './RatingsSection.jsx';
import { CaseTipCallout } from './TipCallout.jsx';
import { model, videoEvidence, imageEvidence, reconstructedImage, reportEvidence, caseWithNotice, caseWithRatings } from '../../../.storybook/fixtures.js';

export default { title: 'Case/Case file', parameters: { layout: 'padded' } };

export const Full = { render: () => <main className="case-main"><CaseFile record={model.latest} /></main> };
export const WithOrganizerNotice = { render: () => <main className="case-main"><CaseFile record={caseWithNotice} /></main> };
export const ImageEvidence = { render: () => <Evidence item={imageEvidence} index={0} /> };
export const ReconstructedImageEvidence = { render: () => (reconstructedImage ? <Evidence item={reconstructedImage} index={0} /> : <p>No reconstructed image in the data.</p>) };
export const VideoEvidence = { render: () => <Evidence item={videoEvidence} index={0} /> };
export const ReportEvidence = { render: () => <Evidence item={reportEvidence} index={0} /> };
export const Notice = { render: () => <OrganizerNotice notice={caseWithNotice.organizerNotice} /> };
export const Ratings = { render: () => <RatingsSection ratings={caseWithRatings.purrHiss} teamById={model.teamById} /> };
export const TipCallout = { render: () => <CaseTipCallout /> };
