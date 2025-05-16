const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const worldWidth = canvas.width;
const worldHeight = canvas.height;
const cellSize = 4;

const cols = Math.floor(worldWidth / cellSize);
const rows = Math.floor(worldHeight / cellSize);

// Initialize world grid
let worldGrid = [];
for (let y = 0; y < rows; y++) {
  worldGrid[y] = [];
  for (let x = 0; x < cols; x++) {
    worldGrid[y][x] = 0; // 0 = empty
  }
}

// Fill bottom 20 rows with solid blocks
for (let y = rows - 20; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    worldGrid[y][x] = 1;
  }
}

// DRAW function
function drawWorld() {
  ctx.clearRect(0, 0, worldWidth, worldHeight); // Clear screen

  // TEMP: Draw red square at top-left to confirm rendering works
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 20, 20);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (worldGrid[y][x] === 1) {
        ctx.fillStyle = "#888";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}


// UPDATE function (logic goes here)
function updateWorld() {
  // (Empty for now – we'll add gravity, movement, etc. later)
}

// MAIN LOOP
function gameLoop() {
  updateWorld();
  drawWorld();
  requestAnimationFrame(gameLoop); // 60 FPS
}

// Start the loop
gameLoop();

