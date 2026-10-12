// Catnip & Hairball Index: a small daily drift in the bar lengths, and a bouncy fill when the section scrolls into view.
// The page ships correct static bars and exact numbers; this only enhances the bars.
(function (root) {
  var MAX_DRIFT = 6; // percentage points of the half-bar, either direction

  function hash(text) {
    var h = 2166136261;
    for (var i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
  }

  // Deterministic drift for a team/side on a given calendar day, in [-MAX_DRIFT, MAX_DRIFT].
  function dailyOffset(dayKey, key) {
    return (hash(dayKey + '|' + key) * 2 - 1) * MAX_DRIFT;
  }

  function dayKeyFor(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  // Underdamped spring step response: starts at 0, overshoots and bounces, settles at target.
  function springWidth(t, target, omega, zeta) {
    if (target <= 0) return 0;
    var wd = omega * Math.sqrt(1 - zeta * zeta);
    var value = target * (1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t)));
    return Math.max(0, Math.min(100, value));
  }

  function adjustedTarget(base, dayKey, key) {
    if (base <= 0) return 0; // an empty bar stays empty
    return Math.max(2, Math.min(100, base + dailyOffset(dayKey, key)));
  }

  // A different, deterministic team order for each calendar day.
  function orderForDay(dayKey, teams) {
    return teams.slice().sort(function (a, b) {
      return hash(dayKey + '|order|' + a) - hash(dayKey + '|order|' + b) || (a < b ? -1 : 1);
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dailyOffset: dailyOffset, springWidth: springWidth, adjustedTarget: adjustedTarget, dayKeyFor: dayKeyFor, orderForDay: orderForDay, MAX_DRIFT: MAX_DRIFT };
  }
  if (!root || !root.document) return;

  var section = root.document.querySelector('.purr-index');
  if (!section) return;
  var bars = [];
  var dayKey = dayKeyFor(new Date());
  var list = section.querySelector('.purr-rows');
  if (list) {
    var byTeam = {};
    Array.prototype.forEach.call(list.children, function (row) { byTeam[row.getAttribute('data-team')] = row; });
    orderForDay(dayKey, Object.keys(byTeam)).forEach(function (team) { list.appendChild(byTeam[team]); });
  }
  Array.prototype.forEach.call(section.querySelectorAll('.purr-row'), function (row) {
    var team = row.getAttribute('data-team') || '';
    ['left', 'right'].forEach(function (side) {
      var bar = row.querySelector('.purr-' + side + ' i');
      if (!bar) return;
      var base = parseFloat(bar.style.width) || 0;
      bars.push({
        el: bar,
        target: adjustedTarget(base, dayKey, team + '|' + side),
        omega: 5 + hash(team + side + 'w') * 4,
        zeta: 0.1 + hash(team + side + 'z') * 0.1
      });
    });
  });

  function settle() {
    bars.forEach(function (bar) { bar.el.style.width = bar.target + '%'; });
  }

  var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !root.requestAnimationFrame) {
    settle();
    return;
  }

  var started = false;
  function animate() {
    if (started) return;
    started = true;
    bars.forEach(function (bar) { bar.el.style.width = '0%'; });
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var t = (now - start) / 1000;
      var running = false;
      bars.forEach(function (bar) {
        var value = springWidth(t, bar.target, bar.omega, bar.zeta);
        bar.el.style.width = value + '%';
        if (t < 6 && (Math.abs(value - bar.target) > 0.15 || t < 0.5)) running = true;
      });
      if (running) root.requestAnimationFrame(frame);
      else settle();
    }
    root.requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in root) {
    var watcher = new root.IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        watcher.disconnect();
        animate();
      }
    }, { threshold: 0.25 });
    // Show the drifted bars right away so nothing jumps if the observer is slow.
    settle();
    watcher.observe(section);
  } else {
    animate();
  }
})(typeof window !== 'undefined' ? window : undefined);
