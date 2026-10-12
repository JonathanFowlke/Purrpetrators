import { SiteLayout } from '../components/layout/SiteLayout.jsx';
import { CaseFile } from '../components/case/CaseFile.jsx';
import { CaseTipCallout } from '../components/case/TipCallout.jsx';

export function CasePage({ record }) {
  return (
    <SiteLayout title={`${record.caseNumber}: ${record.incidentTitle} — PNN`} description={record.summary} current="cases" mainClassName="case-main">
      <CaseFile record={record} />
      <CaseTipCallout />
    </SiteLayout>
  );
}
