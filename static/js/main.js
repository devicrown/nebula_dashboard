// Background
function applyThemeBackground(theme) {
  const el = document.getElementById("vanta-bg");
  if (!el) return;

  // Efface le fond précédent (utile si vidéo/image)
  el.innerHTML = "";
  el.removeAttribute("style");

  if (theme === "nebula") {
    VANTA.FOG({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      blurFactor: 0.17,
      highlightColor: 0,
      midtoneColor: 0,
      lowlightColor: 46079,
      baseColor: 0,
      speed: 0.5,
      zoom: 3
    });
  }

  if (theme === "classic") {
    el.style.background = "url('assets/bg/classic.jpg') center/cover no-repeat";
  }

  if (theme === "dark") {
    el.style.background = "url('assets/bg/dark.jpg') center/cover no-repeat";
  }
}

// Loading UI configuration (title, columns, background, engines)
fetch("config/ui.json")
  .then(res => res.json())
  .then(config => {
    // Apply interface settings
    applyUIConfig(config);
    if (config.theme) {
      const body = document.getElementById("app");
      if (body) {
        body.classList.add(`theme-${config.theme}`);
      }
      // applyThemeBackground(config.theme); // applique le fond lié au thème
      applyThemeBackground(config.theme); // applique le fond lié au thème
    }

    // Dynamically generate search engines if present
    if (config.searchEngines) {
      renderSearchIcons(config.searchEngines);
    }

    if (config.defaultSearchEngine) {
    window.defaultSearchEngine = config.defaultSearchEngine;

    // If the user types a character, simulate the click
    let triggered = false;
    window.addEventListener("keydown", (e) => {
        if (triggered) return; // une seule fois
        const switchContainer = document.getElementById("searchSwitch");
        const defaultIcon = [...switchContainer.children].find(div =>
        div.dataset.engine === window.defaultSearchEngine
        );
        if (defaultIcon) {
        triggered = true;
        expandIcon(defaultIcon);
        // wait for the field to appear
        setTimeout(() => {
            const input = defaultIcon.querySelector("input");
            if (input) input.focus();
        }, 50);
        }
    });
    }

    // After applying the styles, load the shortcuts
    return fetch("config/shortcuts.json");
  })
  .then(res => res.json())
  .then(shortcuts => {
    // Show shortcut cards
    renderBookmarks(shortcuts);
  })
  .catch((err) => {
    console.error("Error in configuration or shortcuts :", err);
  });
