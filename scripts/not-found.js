// A different one-liner from Inspector Clueso each time the 404 page loads. The page ships a static line first.
(function (root) {
  var LINES = [
    'Clueso blames the pink team. Clueso also blames the page.',
    'This page is on the run. Clueso has a hunch it went pink.',
    'Last seen heading toward the starting line. Expected to arrive in a few days.',
    'The page was here yesterday. Witnesses say it was hung out to dry.',
    'The Pyro Posse says it was them. The Pyro Posse says that about most things.',
    'The witches say NO. They were not asked, but NO.',
    'This page has been moved to an undisclosed location. The location is a clothesline.',
    'Clueso checked under the bush. Not there. He is going to check the bush again.',
    'The Area 51 Bureau denies this page ever existed. The Area 51 Bureau denies a lot.',
    'Evidence of a page: none. Evidence of a cover-up: balloons.',
    'The Black Webb Bandits are on their way with this page. They said that last week, too.',
    'File not found. Blame has been assigned.',
    'The Tightie Whities lost this page. It was a loose end.',
    'The Silver Bullets found a page. It is the wrong page. They are disoriented.',
    'The Crimson Crew has not been found either. Clueso suspects they are together.'
  ];

  function pickLine(list, random) {
    return list[Math.floor(random() * list.length)];
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { LINES: LINES, pickLine: pickLine };
  if (!root || !root.document) return;
  var el = root.document.getElementById('error-quip');
  if (el) el.textContent = pickLine(LINES, Math.random);
})(typeof window !== 'undefined' ? window : undefined);
