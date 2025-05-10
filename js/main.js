let cardSize = "160px"; // Valeur par défaut

// Chargement de la configuration UI
fetch("config/ui.json")
  .then(res => res.json())
  .then(config => {
    applyUIConfig(config); // ← définit la variable CSS --card-size

    // Récupère la valeur réelle de cardSize appliquée au DOM
    cardSize = getCardSizeFromConfig();

    // Appliquer le fond si défini
    if (config.background) {
      applyBackground(config.background);
    }

    // Ensuite seulement, charger les raccourcis
    return fetch("config/shortcuts.json");
  })
  .then(res => res.json())
  .then(shortcuts => {
    renderBookmarks(shortcuts, cardSize); // ← utilise la bonne taille
  })
  .catch((err) => {
    console.error("Erreur dans la configuration ou les raccourcis :", err);
  });

// Barre de recherche
document.getElementById("searchBar").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const q = encodeURIComponent(e.target.value);
    window.location.href = `https://duckduckgo.com/?q=${q}`;
  }
});
