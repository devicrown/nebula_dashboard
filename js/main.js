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
