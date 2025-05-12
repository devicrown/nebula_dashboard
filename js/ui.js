// === Liste des moteurs disponibles (tous) ===
const availableEngines = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    icon: "google.svg"
  },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    icon: "duckduckgo.svg"
  },
  brave: {
    name: "Brave",
    url: "https://search.brave.com/search?q=",
    icon: "brave.svg"
  },
  github: {
    name: "GitHub",
    url: "https://github.com/search?q=",
    icon: "github.svg"
  },
  reddit: {
    name: "Reddit",
    url: "https://www.reddit.com/search/?q=",
    icon: "reddit.svg"
  },
  wayback: {
    name: "Wayback Machine",
    url: "https://web.archive.org/web/*/",
    icon: "wayback.svg"
  }
};

// === Application de la configuration UI (titre, colonnes, taille de carte) ===
function applyUIConfig(config) {
  const titleEl = document.querySelector(".logo");
  if (titleEl) titleEl.textContent = config.title || "Nebula Dashboard";

  const grid = document.getElementById("bookmark-container");
  if (grid) {
    const gap = config.cardGap || "1.5rem";
    const columns = config.columns || 3;
    grid.style.gap = gap;
    grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }

  const size = getCardSize(config.cardSize || "medium");
  document.documentElement.style.setProperty('--card-size', size);
}

// === Taille de carte par nom ===
function getCardSize(size) {
  switch (size) {
    case "small": return "120px";
    case "large": return "200px";
    case "medium":
    default: return "160px";
  }
}

// === Lecture de la taille de carte depuis le DOM
function getCardSizeFromConfig() {
  const size = getComputedStyle(document.documentElement).getPropertyValue('--card-size');
  return size.trim() || "160px";
}

// === Génère dynamiquement les icônes de recherche
function renderSearchIcons(engineList) {
  const container = document.getElementById("searchSwitch");
  container.innerHTML = "";

  window.searchEnginesMap = {};              // reset propre
  window.searchEnginesVisible = engineList;  // conserver la liste active

  engineList.forEach(engineKey => {
    const engine = availableEngines[engineKey];
    if (!engine) return;

    window.searchEnginesMap[engineKey] = engine;

    const div = document.createElement("div");
    div.className = "search-icon";
    div.dataset.engine = engineKey;
    div.title = engine.name;
    div.innerHTML = `<img src="assets/icons/${engine.icon}" alt="${engine.name}">`;
    container.appendChild(div);

    div.addEventListener("click", () => expandIcon(div));
  });
}

// === Comportement quand on clique sur une icône
function expandIcon(icon) {
  const engineKey = icon.dataset.engine;
  const engine = window.searchEnginesMap?.[engineKey];
  if (!engine) return;

  // Masquer les autres
  document.querySelectorAll(".search-icon").forEach(i => {
    if (i !== icon) i.style.display = "none";
  });

  // Transformer en champ
  icon.classList.add("expanded");
  icon.innerHTML = `
  <input type="text" placeholder="Recherche sur ${engine.name}..." />
  `;

  const input = icon.querySelector("input");

  input.focus();

  function searchNow() {
    const query = input.value.trim();
    if (query) {
      window.location.href = engine.url + encodeURIComponent(query);
    }
  }

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchNow();
  });

  // Gestion du clic en dehors
  function handleClickOutside(e) {
    if (!icon.contains(e.target)) {
      renderSearchIcons(window.searchEnginesVisible);
      document.removeEventListener("click", handleClickOutside);
    }
  }

  // Laisser le temps au DOM de finir l’événement de clic initial
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
}
