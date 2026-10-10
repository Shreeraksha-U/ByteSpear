/**
 * theme.js: site-wide light/dark theme.
 *
 * - The choice is saved in localStorage, so it persists across every page,
 *   tab and visit. One click on any page changes the whole site.
 * - With no saved choice, the visitor's OS preference is used.
 * - Load this in <head> WITHOUT defer/async. It must run before the page is
 *   painted so there is no flash of the wrong theme.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'techsphere-theme';
  var root = document.documentElement;
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function readSaved() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (e) {
      return null; // storage blocked (private mode, etc.): fall back gracefully
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      
    }
  }

  function systemTheme() {
    return darkQuery.matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  // 1. Apply immediately, before first paint.
  apply(readSaved() || systemTheme());

  // 2. One delegated listener handles every toggle button on the page.
  document.addEventListener('click', function (event) {
    if (!event.target.closest('[data-theme-toggle]')) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    save(next);
  });

  // 3. Keep other open tabs in sync.
  window.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY) apply(readSaved() || systemTheme());
  });

  // 4. Back/forward cache: re-check the saved theme when a page is restored.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) apply(readSaved() || systemTheme());
  });

  // 5. Follow OS changes, but only if the visitor hasn't chosen explicitly.
  darkQuery.addEventListener('change', function () {
    if (!readSaved()) apply(systemTheme());
  });
})();
