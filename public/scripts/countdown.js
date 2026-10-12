// Live countdown to the party. The page ships the date as readable text; this only adds the ticking numbers.
(function (root) {
  function remaining(targetMs, nowMs) {
    var diff = targetMs - nowMs;
    if (!(diff > 0)) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    var total = Math.floor(diff / 1000);
    return {
      done: false,
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { remaining: remaining };
  if (!root || !root.document) return;

  var box = root.document.querySelector('.countdown');
  if (!box) return;
  var target = Date.parse(box.getAttribute('data-target') || '');
  if (isNaN(target)) return;
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
    var left = remaining(target, Date.now());
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
