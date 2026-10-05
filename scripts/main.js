// Decorative launch messages; no network requests or visitor data collection.
(() => {
  const message = document.getElementById('status-message');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!message || reducedMotion.matches) return;
  const messages = [
    'Calibrating purrveillance systems...',
    'Establishing secure connection...',
    'Preparing neighborhood intelligence...',
    'Monitoring suspicious activity...',
    'Prowl in progress...',
    'No comment.',
    'Definitely not watching you.'
  ];
  let index = 0;
  // Intentionally not an aria-live region: decorative updates should not interrupt reading.
  window.setInterval(() => {
    if (document.hidden || reducedMotion.matches) return;
    index = (index + 1) % messages.length;
    message.textContent = messages[index];
  }, 8000);
})();
