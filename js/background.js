function applyBackground(backgroundString) {
  if (!backgroundString) return;

  const [type, value] = backgroundString.split(":");
  const el = document.getElementById("vanta-bg");

  if (!el) {
    console.warn("Élément #vanta-bg introuvable");
    return;
  }

  if (type === "vanta" && window.VANTA && VANTA[value.toUpperCase()]) {
    VANTA[value.toUpperCase()]({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      blurFactor: 0.17,
      highlightColor: 0,
      midtoneColor: 0,
      lowlightColor: 46079,
      baseColor: 0,
      speed: 0.5,
      zoom: 3
    });
  }
}
