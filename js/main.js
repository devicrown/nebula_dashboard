// Chargement de la configuration UI (titre, colonnes, fond, moteurs)
fetch("config/ui.json")
  .then(res => res.json())
  .then(config => {
    // Appliquer les paramètres d’interface
    applyUIConfig(config);

    // Appliquer le fond dynamique si défini
    if (config.background) {
      applyBackground(config.background);
    }

    // Générer dynamiquement les moteurs de recherche si présents
    if (config.searchEngines) {
      renderSearchIcons(config.searchEngines);
    }

    if (config.defaultSearchEngine) {
    window.defaultSearchEngine = config.defaultSearchEngine;

    // Si l'utilisateur tape un caractère, simuler le clic
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
        // attendre que le champ apparaisse
        setTimeout(() => {
            const input = defaultIcon.querySelector("input");
            if (input) input.focus();
        }, 50);
        }
    });
    }

    // Après avoir appliqué les styles, charger les raccourcis
    return fetch("config/shortcuts.json");
  })
  .then(res => res.json())
  .then(shortcuts => {
    // Afficher les cartes de raccourcis
    renderBookmarks(shortcuts);
  })
  .catch((err) => {
    console.error("Erreur dans la configuration ou les raccourcis :", err);
  });
