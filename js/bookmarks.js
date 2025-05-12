function renderBookmarks(shortcuts) {
  const container = document.getElementById("bookmark-container");
  if (!container) return;

  container.innerHTML = "";
  window.lastShortcuts = shortcuts;

  shortcuts.forEach(item => {
    if (item.type === "folder") {
      const card = renderFolderCard(item);
      container.appendChild(card);
    } else {
      const card = document.createElement("a");
      card.href = item.url;
      card.className = "card";
      card.setAttribute("target", "_blank");
      card.innerHTML = `
        <img src="${item.icon}" alt="${item.title}" />
        <span>${item.title}</span>
      `;
      container.appendChild(card);
    }
  });
}

function renderFolderCard(folder) {
  const card = document.createElement("div");
  card.className = "card folder-card";
  card.dataset.folderTitle = folder.title;

  // Crée dynamiquement les 4 mini-icônes
  const miniContainer = document.createElement("div");
  miniContainer.className = "mini-icons";

  folder.children.slice(0, 4).forEach(child => {
    const icon = document.createElement("img");
    icon.src = child.icon;
    icon.alt = child.title;
    icon.className = "mini-icon";
    miniContainer.appendChild(icon);
  });

  // Crée le titre du dossier
  const title = document.createElement("span");
  title.textContent = folder.title;

  // Ajoute tout à la carte
  card.appendChild(miniContainer);
  card.appendChild(title);

  // Ajoute le comportement au clic
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    expandFolder(folder, card);
  });

  return card;
}


function expandFolder(folder, card) {
  document.querySelectorAll(".folder-card").forEach(c => {
    if (c !== card) c.classList.add("hidden");
  });

  const miniIcons = card.querySelector(".mini-icons");
  const title = card.querySelector("span");

  if (miniIcons) {
    miniIcons.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    miniIcons.style.opacity = "1";
    miniIcons.style.transform = "translateY(0)";
    requestAnimationFrame(() => {
      miniIcons.style.opacity = "0";
      miniIcons.style.transform = "translateY(10px)";
    });
  }

  setTimeout(() => {
    card.innerHTML = "";
    card.classList.add("folder-opened");

    const content = document.createElement("div");
    content.className = "folder-inner";

    content.innerHTML = `
      <div class="folder-header-inside">
        <img src="assets/icons/folder.svg" class="folder-icon" />
        <h2>${folder.title}</h2>
      </div>
      <div class="folder-content-inside">
        ${folder.children.map(child => `
          <a href="${child.url}" target="_blank" class="folder-link-inside">
            <img src="${child.icon}" alt="${child.title}" />
            <span>${child.title}</span>
          </a>
        `).join("")}
      </div>
    `;

    card.appendChild(content);
    document.addEventListener("click", closeFolderOnClick);
  }, 150);

  function closeFolderOnClick(e) {
    if (!card.contains(e.target)) {
      closeFolder(card);
      document.removeEventListener("click", closeFolderOnClick);
    }
  }
}

function closeFolder(card) {
  const folderTitle = card.dataset.folderTitle;
  const folder = window.lastShortcuts.find(item => item.title === folderTitle);
  if (!folder || !folder.children) return;

  card.classList.remove("folder-opened");
  card.classList.add("folder-closing");

  // Nettoyage
  card.innerHTML = "";

  // Création réelle des éléments DOM
  const miniContainer = document.createElement("div");
  miniContainer.className = "mini-icons fade-in";

  folder.children.slice(0, 4).forEach(child => {
    const icon = document.createElement("img");
    icon.src = child.icon;
    icon.alt = child.title;
    icon.className = "mini-icon";
    miniContainer.appendChild(icon);
  });

  const title = document.createElement("span");
  title.textContent = folder.title;

  card.appendChild(miniContainer);
  card.appendChild(title);

  card.addEventListener("click", (e) => {
    e.stopPropagation();
    expandFolder(folder, card);
  });

  // Fin animation
  setTimeout(() => {
    card.classList.remove("folder-closing");
    document.querySelectorAll(".folder-card").forEach(c => c.classList.remove("hidden"));
  }, 300);
}



