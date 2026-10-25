// Live countdown to the party, or count-up from the final result. The page ships the dates as readable text; this only adds the ticking numbers.
(function (root) {
  function split(total) {
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60
    };
  }

  function remaining(targetMs, nowMs) {
    var diff = targetMs - nowMs;
    if (!(diff > 0)) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    var left = split(Math.floor(diff / 1000));
    left.done = false;
    return left;
  }

  // Time since a moment; zero (never negative) before it.
  function elapsed(sinceMs, nowMs) {
    return split(Math.max(0, Math.floor((nowMs - sinceMs) / 1000)));
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { remaining: remaining, elapsed: elapsed };
  if (!root || !root.document) return;

  var box = root.document.querySelector('.countdown');
  if (!box) return;
  var since = Date.parse(box.getAttribute('data-since') || '');
  var target = Date.parse(box.getAttribute('data-target') || '');
  if (isNaN(since) && isNaN(target)) return;
  var parts = {
    days: box.querySelector('[data-unit="days"]'),
    hours: box.querySelector('[data-unit="hours"]'),
    minutes: box.querySelector('[data-unit="minutes"]'),
    seconds: box.querySelector('[data-unit="seconds"]')
  };
  var heading = box.querySelector('.countdown-title');
  var timer = null;

  function pad(value) { return value < 10 ? '0' + value : String(value); }

  function tick() {
    var left = isNaN(since) ? remaining(target, Date.now()) : elapsed(since, Date.now());
    parts.days.textContent = String(left.days);
    parts.hours.textContent = pad(left.hours);
    parts.minutes.textContent = pad(left.minutes);
    parts.seconds.textContent = pad(left.seconds);
    if (left.done) {
      box.classList.add('is-done');
      if (heading) heading.textContent = 'The party is here. Time ran out. Clueso is not surprised.';
      if (timer) root.clearInterval(timer);
    }
  }

  box.classList.add('is-live');
  tick();
  timer = root.setInterval(tick, 1000);
})(typeof window !== 'undefined' ? window : undefined);
