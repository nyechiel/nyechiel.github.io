(function() {
  var groups = document.querySelectorAll('.tag-group');
  var pills = document.querySelectorAll('.tags-cloud .post-tag--link');
  var allBtn = document.querySelector('[data-show-all]');

  function filterByHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) {
      showAll();
      return;
    }
    var found = false;
    groups.forEach(function(g) {
      if (g.id === hash) {
        g.style.display = '';
        found = true;
      } else {
        g.style.display = 'none';
      }
    });
    if (!found) {
      showAll();
      return;
    }
    pills.forEach(function(p) {
      if (p.getAttribute('href') === '#' + hash) {
        p.classList.add('post-tag--active');
      } else {
        p.classList.remove('post-tag--active');
      }
    });
    if (allBtn) allBtn.classList.remove('post-tag--active');
  }

  function showAll() {
    groups.forEach(function(g) { g.style.display = ''; });
    pills.forEach(function(p) { p.classList.remove('post-tag--active'); });
    if (allBtn) allBtn.classList.add('post-tag--active');
  }

  if (allBtn) {
    allBtn.addEventListener('click', function(e) {
      e.preventDefault();
      history.replaceState(null, '', window.location.pathname);
      showAll();
    });
  }

  window.addEventListener('hashchange', filterByHash);
  filterByHash();
})();
