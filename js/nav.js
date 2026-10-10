(function () {
  "use strict";

  var masthead = document.getElementById("masthead");
  var toggle = document.getElementById("menu-toggle");
  var sheet = document.getElementById("mobile-sheet");

  if (!masthead || !toggle || !sheet) {
    return;
  }

  var toggleLabel = toggle.querySelector(".sr-only");
  var desktopQuery = window.matchMedia("(min-width: 1081px)");
  var SCROLL_THRESHOLD = 8;

  function isMenuOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    sheet.classList.add("is-open");
    document.body.classList.add("is-locked");
    if (toggleLabel) {
      toggleLabel.textContent = "Close menu";
    }
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    sheet.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    if (toggleLabel) {
      toggleLabel.textContent = "Open menu";
    }
  }

  function onToggleClick() {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function onSheetClick(event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  }

  function onDocumentClick(event) {
    if (!isMenuOpen() || masthead.contains(event.target)) {
      return;
    }
    closeMenu();
  }

  function onDocumentKeydown(event) {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      toggle.focus();
    }
  }

  function onViewportChange(event) {
    if (event.matches) {
      closeMenu();
    }
  }

  function syncScrollState() {
    masthead.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  toggle.addEventListener("click", onToggleClick);
  sheet.addEventListener("click", onSheetClick);
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentKeydown);
  window.addEventListener("scroll", syncScrollState, { passive: true });

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", onViewportChange);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(onViewportChange);
  }

  syncScrollState();
})();
