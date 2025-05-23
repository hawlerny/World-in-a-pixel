document.addEventListener("DOMContentLoaded", () => {
  const fullscreenBtn = document.getElementById("fullscreenToggle");

  // Set the fullscreen icon
  function updateFullscreenIcon() {
    fullscreenBtn.textContent = document.fullscreenElement ? "⤫" : "⛶";
  }

  // Toggle fullscreen
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Failed to enter fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  });

  // React to DOM fullscreen enter/exit (incl. F11 if leaving fullscreen)
  document.addEventListener("fullscreenchange", () => {
    updateFullscreenIcon();

    // If your canvas/layout needs resizing:
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  });

  // Set icon on page load
  updateFullscreenIcon();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    // Wait a moment to give browser time to enter fullscreen
    setTimeout(() => {
      // We can’t know for sure, but we can assume user entered fullscreen
      const fullscreenBtn = document.getElementById("fullscreenToggle");

      // We assume F11 = fullscreen on (this is best guess)
      fullscreenBtn.textContent = "⤫";
    }, 500);
  }
});
const fullscreenBtn = document.getElementById("fullscreenToggle");

function isBrowserFullscreen() {
  // Heuristic: is window nearly full screen?
  return Math.abs(window.innerHeight - screen.height) < 10;
}

function updateFullscreenIcon() {
  fullscreenBtn.textContent = isBrowserFullscreen() ? "⤫" : "⛶";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F11") {
    // Let browser handle F11, then update icon after short delay
    setTimeout(updateFullscreenIcon, 100);
  }
});

window.addEventListener("resize", () => {
  // Update icon on any window resize (F11 usually triggers this)
  updateFullscreenIcon();
});

// Initial update on page load
updateFullscreenIcon();

// Also listen to DOM fullscreen changes (button-triggered fullscreen)
document.addEventListener("fullscreenchange", updateFullscreenIcon);
function saveAndQuit() {
  // Run your save logic here (placeholder):
  console.log("Game saved."); // Replace with actual save function if needed

  // Attempt to close the window
  window.close();

  // If that fails (most browsers block window.close unless opened by JS), inform the user
  setTimeout(() => {
    if (!window.closed) {
      alert("Cannot close the window automatically. Please close it manually.");
    }
  }, 100);
}
document.addEventListener("DOMContentLoaded", () => {
  const saveQuitBtn = document.getElementById("saveQuitBtn");
  if (saveQuitBtn) {
    saveQuitBtn.addEventListener("click", saveAndQuit);
  } else {
    console.warn("Save & Quit button not found.");
  }
});
function saveAndQuit() {
  if (typeof window.saveHUDState === "function") {
    window.saveHUDState(); // Save HUD layout
  }

  console.log("Game saved.");
  window.close();

  setTimeout(() => {
    if (!window.closed) {
      alert("Cannot close the window automatically. Please close it manually.");
    }
  }, 100);
}
