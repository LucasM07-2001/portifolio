(function () {
  'use strict';

  var STORAGE_KEY = 'torch-theme';
  var DARK_CLASS = 'dark-theme';

  var checkbox = document.getElementById('torch-checkbox');
  if (!checkbox) return;

  function getInitialTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  }

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add(DARK_CLASS);
      checkbox.checked = false;
    } else {
      document.body.classList.remove(DARK_CLASS);
      checkbox.checked = true;
    }
  }

  function saveTheme(isDark) {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  var isDark = getInitialTheme();
  applyTheme(isDark);

  checkbox.addEventListener('change', function () {
    var torchOn = checkbox.checked;
    var newIsDark = !torchOn;
    applyTheme(newIsDark);
    saveTheme(newIsDark);
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        applyTheme(e.matches);
      }
    });
  }
})();
