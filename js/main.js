// Loading UI configuration (title, columns, background, engines)
fetch("config/ui.json")
  .then(res => res.json())
  .then(config => {
    // Apply interface settings
    applyUIConfig(config);

    // Apply dynamic background if defined
    if (config.background) {
      applyBackground(config.background);
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
