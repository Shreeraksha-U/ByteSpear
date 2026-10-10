/**
 * search.js: live filter for the blog search box (#blog-search).
 * Hides any post/article card whose text doesn't match the query.
 */
(function () {
  'use strict';

  var input = document.getElementById('blog-search');
  if (!input) return;

  var cards = document.querySelectorAll('.blog-post, .article-card');

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();
    cards.forEach(function (card) {
      card.hidden = query !== '' && !card.textContent.toLowerCase().includes(query);
    });
  });
})();
