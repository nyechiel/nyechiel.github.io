(function() {
  var input = document.getElementById('nav-search-input');
  var resultsEl = document.getElementById('nav-search-results');
  var toggle = document.getElementById('nav-search-toggle');
  var container = document.getElementById('nav-search');
  if (!input || !resultsEl || !toggle || !container) return;

  var posts = null;
  var debounceTimer = null;
  var isOpen = false;

  var searchUrl = container.getAttribute('data-search-url');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', searchUrl);
  xhr.onload = function() {
    if (xhr.status === 200) posts = JSON.parse(xhr.responseText);
  };
  xhr.send();

  function openSearch() {
    isOpen = true;
    container.classList.add('nav-search--open');
    input.focus();
  }

  function closeSearch() {
    isOpen = false;
    container.classList.remove('nav-search--open');
    input.value = '';
    resultsEl.innerHTML = '';
    resultsEl.style.display = 'none';
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isOpen) { closeSearch(); } else { openSearch(); }
  });

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSearch, 200);
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeSearch(); }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#nav-search')) { closeSearch(); }
  });

  function doSearch() {
    var query = input.value.trim().toLowerCase();
    if (!query || !posts) {
      resultsEl.innerHTML = '';
      resultsEl.style.display = 'none';
      return;
    }

    var words = query.split(/\s+/).filter(function(w) { return w.length > 0; });
    var scored = [];

    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var score = 0;
      var titleLower = post.title.toLowerCase();
      var tagsLower = post.tags.map(function(t) { return t.toLowerCase(); });
      var contentLower = post.content.toLowerCase();

      for (var j = 0; j < words.length; j++) {
        var w = words[j];
        if (titleLower.indexOf(w) !== -1) score += 10;
        for (var k = 0; k < tagsLower.length; k++) {
          if (tagsLower[k].indexOf(w) !== -1) score += 5;
        }
        if (contentLower.indexOf(w) !== -1) score += 1;
      }

      if (score > 0) scored.push({ post: post, score: score });
    }

    scored.sort(function(a, b) { return b.score - a.score; });

    if (scored.length === 0) {
      resultsEl.innerHTML = '<div class="nav-search__empty">No results</div>';
      resultsEl.style.display = 'block';
      return;
    }

    var max = Math.min(scored.length, 6);
    var html = '';
    for (var i = 0; i < max; i++) {
      var p = scored[i].post;
      html += '<a class="nav-search__item" href="' + esc(p.url) + '">';
      html += '<span class="nav-search__item-title">' + esc(p.title) + '</span>';
      html += '<span class="nav-search__item-date">' + esc(p.date) + '</span>';
      html += '</a>';
    }
    if (scored.length > max) {
      html += '<a class="nav-search__more" href="/search/?q=' + encodeURIComponent(input.value.trim()) + '">' + scored.length + ' results - view all</a>';
    }
    resultsEl.innerHTML = html;
    resultsEl.style.display = 'block';
  }

  function esc(text) {
    var el = document.createElement('div');
    el.appendChild(document.createTextNode(text));
    return el.innerHTML;
  }
})();
