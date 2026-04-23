 /* Tab switching */
 (function () {
    var tabs = document.querySelectorAll('.pt-tab:not(:disabled)');
    var stages = document.querySelectorAll('.pt-stage');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.stage;
        tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        stages.forEach(function (s) { s.classList.add('hidden'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        var active = document.querySelector('.pt-stage[data-stage-content="' + target + '"]');
        if (active) {
          active.classList.remove('hidden');
          animateBars(active);
        }
      });
    });

    /* Animate bars in when visible */
    function animateBars(container) {
      var fills = container.querySelectorAll('.pt-bar-fill');
      fills.forEach(function (el, i) {
        el.style.width = '0';
        setTimeout(function () {
          el.style.width = el.dataset.pct + '%';
        }, i * 80 + 120);
      });
    }

    /* Run on page load for the default visible stage */
    var defaultStage = document.querySelector('.pt-stage:not(.hidden)');
    if (defaultStage) {
      setTimeout(function () { animateBars(defaultStage); }, 300);
    }
  })();