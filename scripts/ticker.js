// PNN news ticker. The page ships a static headline list (case headlines plus a few fake news items);
// this script mixes in a fresh random sample from the full pool and makes it scroll.
(function (root) {
  var SPEED = 70; // pixels per second

  function shuffle(list, random) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  // Fixed items (case headlines, index standings) are spread evenly among a random sample of pool items.
  function buildSequence(fixed, pool, count, random) {
    var picks = shuffle(pool, random).slice(0, Math.min(count, pool.length));
    var out = [];
    var every = fixed.length ? Math.max(1, Math.floor(picks.length / fixed.length)) : Infinity;
    var next = 0;
    picks.forEach(function (item, index) {
      out.push({ item: item, fixed: false });
      if (next < fixed.length && (index + 1) % every === 0) out.push({ item: fixed[next++], fixed: true });
    });
    while (next < fixed.length) out.push({ item: fixed[next++], fixed: true });
    return out;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { shuffle: shuffle, buildSequence: buildSequence };
  if (!root || !root.document) return;

  var doc = root.document;
  var track = doc.querySelector('.ticker-track');
  var ticker = doc.querySelector('.ticker');
  if (!track || !ticker) return;
  var toggle = ticker.querySelector('.ticker-toggle');
  var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeItem(entry, prefixHref) {
    var li = doc.createElement('li');
    li.className = 'ticker-item';
    var tag = doc.createElement('span');
    tag.className = 'ticker-tag';
    tag.textContent = entry.tag;
    li.appendChild(tag);
    li.appendChild(doc.createTextNode(' '));
    if (entry.node) {
      li.appendChild(entry.node);
    } else {
      li.appendChild(doc.createTextNode(entry.text));
    }
    return li;
  }

  function go(pool) {
    var fixedEls = Array.prototype.slice.call(track.querySelectorAll('[data-fixed]'));
    var fixed = fixedEls.map(function (li) {
      var tagEl = li.querySelector('.ticker-tag');
      var link = li.querySelector('a');
      return { tag: tagEl ? tagEl.textContent : '', text: li.textContent.replace(tagEl ? tagEl.textContent : '', '').trim(), node: link ? link.cloneNode(true) : null, el: li };
    });
    var sequence = pool && pool.length ? buildSequence(fixed, pool.filter(function (p) { return p && typeof p.tag === 'string' && typeof p.text === 'string'; }), 24, Math.random) : null;
    if (sequence) {
      while (track.firstChild) track.removeChild(track.firstChild);
      sequence.forEach(function (step) {
        var li = step.fixed ? step.item.el.cloneNode(true) : makeItem(step.item);
        track.appendChild(li);
      });
    }
    if (reduce || !root.requestAnimationFrame) return; // leave a plain, scrollable list
    // Duplicate the list so the loop is seamless, and hide the copies from assistive tech.
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (li) {
      var clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      Array.prototype.forEach.call(clone.querySelectorAll('a'), function (a) { a.setAttribute('tabindex', '-1'); });
      track.appendChild(clone);
    });
    var width = track.scrollWidth / 2;
    track.style.setProperty('--ticker-duration', Math.max(30, width / SPEED) + 's');
    ticker.classList.add('is-live');
    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        var paused = ticker.classList.toggle('is-paused');
        toggle.textContent = paused ? 'Play' : 'Pause';
        toggle.setAttribute('aria-label', paused ? 'Resume the news ticker' : 'Pause the news ticker');
      });
    }
  }

  var src = track.getAttribute('data-src');
  if (!src || !root.fetch) { go(null); return; }
  root.fetch(src).then(function (response) {
    if (!response.ok) throw new Error('unavailable');
    return response.json();
  }).then(go, function () { go(null); });
})(typeof window !== 'undefined' ? window : undefined);
