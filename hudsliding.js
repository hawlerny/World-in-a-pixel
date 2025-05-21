window.addEventListener("DOMContentLoaded", () => {
  const hudLeft = document.getElementById("hudLeft");
  const hudRight = document.getElementById("hudRight");
  const hudBottom = document.getElementById("hudBottom");

  // Get the drag handles inside each panel
const leftHandle = hudLeft.querySelector(".drag-handle-left");
const rightHandle = hudRight.querySelector(".drag-handle-right");
const bottomHandle = hudBottom.querySelector(".drag-handle-bottom");


  const GAME_HEIGHT = 600; // Adjust to your game container height

  let isDragging = false;
  let activePanel = null;
  let dragSide = null; // "left" | "right" | "bottom"
  let initialMouseX = 0;
  let initialMouseY = 0;
  let initialOffsetX = 0;
  let initialOffsetY = 0;
  let draggingAxis = null; // "horizontal" | "vertical"

  // Clamping functions

  function clampLeftPanel(x) {
    return Math.max(-240, Math.min(-145, x));
  }

  function clampRightPanel(x) {
    return Math.max(960, Math.min(1055, x));
  }

  function clampVertical(y, panel) {
    const panelHeight = panel.offsetHeight;
    const topLimit = -150;
    const bottomLimit = GAME_HEIGHT - panelHeight + 200;
    return Math.max(topLimit, Math.min(bottomLimit, y));
  }

  function clampBottomPanel(y, panel) {
    const panelHeight = panel.offsetHeight;
    const baseTop = GAME_HEIGHT; // original top of bottom panel
    const topLimit = baseTop - 30;
    const bottomLimit = baseTop + 50;
    return Math.max(topLimit, Math.min(bottomLimit, y));
  }

  // Mouse move handler

  function handleMouseMove(e) {
    if (!isDragging || !activePanel) return;

    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;

    if (draggingAxis === "horizontal") {
      if (dragSide === "left") {
        const newLeft = clampLeftPanel(initialOffsetX + dx);
        activePanel.style.left = `${newLeft}px`;
      } else if (dragSide === "right") {
        const newLeft = clampRightPanel(initialOffsetX + dx);
        activePanel.style.left = `${newLeft}px`;
      }
    } else if (draggingAxis === "vertical") {
      if (dragSide === "bottom") {
        const newTop = clampBottomPanel(initialOffsetY + dy, activePanel);
        activePanel.style.top = `${newTop}px`;
      } else {
        const newTop = clampVertical(initialOffsetY + dy, activePanel);
        activePanel.style.top = `${newTop}px`;
      }
    }
  }

  // Mouse up handler

  function handleMouseUp() {
    isDragging = false;
    activePanel = null;
    dragSide = null;
    draggingAxis = null;
    document.body.style.userSelect = "auto";
  }

  // Attach draggable behavior to handles

  function makeHandleDraggable(handle, panel, side, axis) {
    handle.style.cursor = axis === "horizontal" ? "ew-resize" : "ns-resize";

    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      activePanel = panel;
      dragSide = side;
      draggingAxis = axis;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;

      const computed = getComputedStyle(panel);
      initialOffsetX = parseInt(computed.left, 10);
      initialOffsetY = parseInt(computed.top, 10);

      document.body.style.userSelect = "none";
    });
  }

  // Global mouse listeners to track drag

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // Initialize draggable handles

  makeHandleDraggable(leftHandle, hudLeft, "left", "horizontal");
  makeHandleDraggable(rightHandle, hudRight, "right", "horizontal");
  makeHandleDraggable(bottomHandle, hudBottom, "bottom", "vertical");
});
