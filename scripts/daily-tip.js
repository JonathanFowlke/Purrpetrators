// Shows a different tip each local calendar day, cycling through the list in order.
// The page ships a static fallback tip, so this only enhances it.
(function (root) {
  function pickTip(tips, date) {
    if (!Array.isArray(tips) || !tips.length) return null;
    var day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
    return tips[((day % tips.length) + tips.length) % tips.length];
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { pickTip: pickTip };
  if (!root || !root.document) return;
  var data = root.document.getElementById('daily-tips-data');
  var topic = root.document.getElementById('daily-tip-topic');
  var text = root.document.getElementById('daily-tip-text');
  if (!data || !topic || !text) return;
  try {
    var tip = pickTip(JSON.parse(data.textContent), new Date());
    if (tip && typeof tip.text === 'string' && typeof tip.topic === 'string') {
      topic.textContent = tip.topic;
      text.textContent = tip.text;
    }
  } catch (error) {
    // Keep the static fallback tip.
  }
})(typeof window !== 'undefined' ? window : undefined);
