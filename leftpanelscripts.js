const glass = document.getElementById("glassCover");
const buttonContainer = document.querySelector(".protected-button-container");
const button = document.getElementById("protectedButton");

let isLifted = false;

glass.addEventListener("mousedown", function (e) {
  const startY = e.clientY;

  function onMouseMove(e) {
    const dy = e.clientY - startY;
    if (dy < -20 && !isLifted) {
      liftGlass();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
  }

  function onMouseUp() {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});

// Toggle glass closed on click if it's already lifted
glass.addEventListener("click", () => {
  if (isLifted) {
    lowerGlass();
  }
});

function liftGlass() {
  glass.style.transform = "translateY(-45px)";
  button.disabled = false;
  buttonContainer.classList.add("glass-lifted");
  isLifted = true;
}

function lowerGlass() {
  glass.style.transform = "translateY(0)";
  button.disabled = true;
  buttonContainer.classList.remove("glass-lifted");
  isLifted = false;
}
