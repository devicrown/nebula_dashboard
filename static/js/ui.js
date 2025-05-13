// === List of available engines (all) ===
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

let searchOpen = false;

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

function getCardSize(size) {
  switch (size) {
    case "small": return "120px";
    case "large": return "200px";
    case "medium":
    default: return "160px";
  }
}

function getCardSizeFromConfig() {
  const size = getComputedStyle(document.documentElement).getPropertyValue('--card-size');
  return size.trim() || "160px";
}

function renderSearchIcons(engineList) {
  const container = document.getElementById("searchSwitch");
  container.innerHTML = "";

  window.searchEnginesMap = {};
  window.searchEnginesVisible = engineList;

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

    div.addEventListener("click", (event) => {
      event.stopPropagation();
      expandIcon(div, container);
    });
  });
}

function expandIcon(icon, container) {
  const engineKey = icon.dataset.engine;
  const engine = window.searchEnginesMap?.[engineKey];
  if (!engine) return;

  // Clean all children first
  container.innerHTML = "";

  const expandedDiv = document.createElement("div");
  expandedDiv.className = "search-icon expanded";
  expandedDiv.dataset.engine = engineKey;
  expandedDiv.innerHTML = `
    <input type="text" placeholder="Recherche sur ${engine.name}..." />
  `;
  container.appendChild(expandedDiv);

  const input = expandedDiv.querySelector("input");
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

  input.addEventListener("click", e => e.stopPropagation());

  function handleClickOutside(e) {
    if (!expandedDiv.contains(e.target)) {
      searchOpen = false;
      renderSearchIcons(window.searchEnginesVisible);
      document.removeEventListener("click", handleClickOutside);
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

  searchOpen = true;
}
