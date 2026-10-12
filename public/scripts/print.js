// Wire the "Print" buttons on the printable pages. Browser Print works without JavaScript.
(function () {
  document.querySelectorAll('[data-print]').forEach(function (button) {
    button.addEventListener('click', function () { window.print(); });
  });
})();
