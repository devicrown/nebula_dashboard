function renderBookmarks(shortcuts) {
  const container = document.getElementById("bookmark-container");
  if (!container) return;

  container.innerHTML = ""; // Nettoyer avant affichage

  shortcuts.forEach(shortcut => {
    const card = document.createElement("a");
    card.href = shortcut.url;
    card.className = "card";
    card.setAttribute("target", "_blank"); // ouvre dans un nouvel onglet (optionnel)

    card.innerHTML = `
      <img src="${shortcut.icon}" alt="${shortcut.title}" />
      <span>${shortcut.title}</span>
    `;

    container.appendChild(card);
  });
}
