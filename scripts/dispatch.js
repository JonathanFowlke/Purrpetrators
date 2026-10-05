// The printed URL stays fixed. Read the latest published collection on each visit.
(() => {
  const root = new URL('../', document.currentScript.src);
  const status = document.getElementById('dispatch-status');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  fetch(new URL('data/cases.json', root), { cache: 'no-store', signal: controller.signal })
    .then(response => {
      if (!response.ok) throw new Error('Case collection unavailable');
      return response.json();
    })
    .then(records => {
      if (!Array.isArray(records)) throw new Error('Invalid case collection');
      const ids = [...new Set(records.filter(record => record && record.published === true &&
        typeof record.id === 'string' && /^\d{3}$/.test(record.id)).map(record => record.id))];
      if (!ids.length) {
        status.textContent = 'No case files are ready for dispatch yet. Check back soon.';
        return;
      }
      const id = ids[Math.floor(Math.random() * ids.length)];
      // Only local, validated case IDs become destinations. replace avoids a Back-button loop.
      window.location.replace(new URL(`cases/${id}/index.html`, root).href);
    })
    .catch(() => {
      status.textContent = "The dispatch desk couldn't open a file. Browse the case files below.";
    })
    .finally(() => window.clearTimeout(timeout));
})();
