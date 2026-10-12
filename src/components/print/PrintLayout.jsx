import { Document } from '../layout/Document.jsx';
import { useUrl } from '../../lib/site.jsx';

/** Print-only page shell: no masthead, ticker, or footer. `tools` sits above the printable area on screen only. */
export function PrintLayout({ title, description, robots, styles, bodyClassName, skipLabel, tools, children }) {
  const url = useUrl();
  return (
    <Document title={title} description={description} robots={robots} themeColor={null} styles={['assets/css/styles.css', ...styles]} bodyClassName={bodyClassName}>
      <a className="skip-link" href="#main">{skipLabel}</a>
      {tools}
      {children}
      <script src={url('scripts/print.js')} defer />
    </Document>
  );
}

export function PrintButton({ children }) {
  return <button type="button" data-print>{children}</button>;
}
