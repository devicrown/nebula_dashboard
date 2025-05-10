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
