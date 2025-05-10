function renderBookmarks(shortcuts, cardSize) {
  const container = document.getElementById("bookmark-container");
  if (!container) return;

  shortcuts.forEach(shortcut => {
    const card = document.createElement("a");
    card.href = shortcut.url;
    card.className = "card";
    card.innerHTML = `
      <img src="${shortcut.icon}" alt="${shortcut.title}" />
      <span>${shortcut.title}</span>
    `;
    container.appendChild(card);
  });
}
