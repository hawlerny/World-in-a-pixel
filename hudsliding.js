window.addEventListener("DOMContentLoaded", () => {
  const hudLeft = document.getElementById("hudLeft");
  const hudRight = document.getElementById("hudRight");

  let isDragging = false;
  let activePanel = null;
  let dragSide = null;
  let initialMouseX = 0;
  let initialOffset = 0;

  const panelWidth = 175;
  const dragLimit1 = 15; // +/-10px flexibility
  const dragLimit2 = 25; // +/-20px flexibility

  function isOnEdge(e, panel, side) {
    const edgeZone = 10;
    if (side === "left") return e.offsetX <= edgeZone;
    if (side === "right") return e.offsetX >= panel.offsetWidth - edgeZone;
    return false;
  }

  function clampLeftPanel(offset) {
    const min = -panelWidth - dragLimit1;  // -185
    const max = -panelWidth + dragLimit2;  // -165
    return Math.max(min, Math.min(max, offset));
  }

  function clampRightPanel(offset) {
    const min = -panelWidth + dragLimit2;  // -165 (closer to game)
    const max = -panelWidth - dragLimit1;  // -185 (further from game)
    return Math.min(min, Math.max(max, offset));
  }

  function handleMouseMove(e) {
    if (!isDragging || !activePanel) return;

    const dx = e.clientX - initialMouseX;

    if (dragSide === "left") {
      const newOffset = clampLeftPanel(initialOffset + dx);
      activePanel.style.left = `${newOffset}px`;
    } else if (dragSide === "right") {
      const newOffset = clampRightPanel(initialOffset - dx);
      activePanel.style.right = `${newOffset}px`;
    }
  }

  function handleMouseUp() {
    isDragging = false;
    activePanel = null;
    dragSide = null;
    document.body.style.userSelect = "auto";
  }

  function makeDraggable(panel, side) {
    panel.addEventListener("mousemove", (e) => {
      panel.style.cursor = isOnEdge(e, panel, side) ? "ew-resize" : "default";
    });

    panel.addEventListener("mousedown", (e) => {
      if (!isOnEdge(e, panel, side)) return;

      isDragging = true;
      activePanel = panel;
      dragSide = side;
      initialMouseX = e.clientX;

      if (side === "left") {
        initialOffset = parseInt(getComputedStyle(panel).left, 10);
      } else if (side === "right") {
        initialOffset = parseInt(getComputedStyle(panel).right, 10);
      }

      document.body.style.userSelect = "none";
    });
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  makeDraggable(hudLeft, "left");
  makeDraggable(hudRight, "right");
});
