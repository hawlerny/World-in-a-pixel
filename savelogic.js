document.addEventListener("DOMContentLoaded", () => {
  const hudPanels = ["hudLeft", "hudRight", "hudBottom"];

  // Load saved positions
  hudPanels.forEach(id => {
    const panel = document.getElementById(id);
    const saved = localStorage.getItem(`hudPos_${id}`);
    if (panel && saved) {
      const { top, left, bottom } = JSON.parse(saved);
      if (top !== undefined) panel.style.top = top;
      if (left !== undefined) panel.style.left = left;
      if (bottom !== undefined) panel.style.bottom = bottom;
    }
  });

  // Track and save HUD positions
  function saveHUDState() {
    hudPanels.forEach(id => {
      const panel = document.getElementById(id);
      const pos = {
        top: panel.style.top || undefined,
        left: panel.style.left || undefined,
        bottom: panel.style.bottom || undefined
      };
      localStorage.setItem(`hudPos_${id}`, JSON.stringify(pos));
    });
  }

  // Make it accessible from other files (like your save button)
  window.saveHUDState = saveHUDState;
});
const fs = require("fs");
const path = require("path");

const saveFolder = path.join(__dirname, "save");
const saveFile = path.join(saveFolder, "save.txt");

const hudPanels = ["hudLeft", "hudRight", "hudBottom"];

function saveHUDState() {
  if (!fs.existsSync(saveFolder)) {
    fs.mkdirSync(saveFolder);
  }

  let existingData = "";
  if (fs.existsSync(saveFile)) {
    existingData = fs.readFileSync(saveFile, "utf-8");
  }

  // Filter out old HUD lines
  const filteredLines = existingData
    .split("\n")
    .filter(line => !hudPanels.some(id => line.startsWith(`${id}:`)));

  // Add updated HUD positions
  hudPanels.forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    filteredLines.push(`${id}:${rect.left},${rect.top}`);
  });

  const finalData = filteredLines.join("\n");
  fs.writeFileSync(saveFile, finalData);
  console.log("HUD state saved to:", saveFile);
}

function loadHUDState() {
  if (!fs.existsSync(saveFile)) return;

  const lines = fs.readFileSync(saveFile, "utf-8").split("\n");
  lines.forEach(line => {
    if (!line.trim()) return;

    const [key, value] = line.split(":");
    if (hudPanels.includes(key)) {
      const [x, y] = value.split(",").map(Number);
      const panel = document.getElementById(key);
      if (panel) {
        panel.style.position = "absolute";
        panel.style.left = `${x}px`;
        panel.style.top = `${y}px`;
      }
    }
  });

  console.log("HUD state loaded from:", saveFile);
}

window.saveHUDState = saveHUDState;
window.loadHUDState = loadHUDState;
