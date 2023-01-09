const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the size of the canvas
canvas.width = 500;
canvas.height = 500;

// Set the size of each block in pixels
const blockSize = 50;

// Create an empty grid
const grid = [];
for (let i = 0; i < canvas.width / blockSize; i++) {
  grid[i] = [];
  for (let j = 0; j < canvas.height / blockSize; j++) {
    grid[i][j] = 0;
  }
}

// Set the starting position of the player
let playerX = 0;
let playerY = 0;

// Set the player's speed in blocks per second
const playerSpeed = 1;

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    playerX -= playerSpeed;
  } else if (event.code === "ArrowRight") {
    playerX += playerSpeed;
  } else if (event.code === "ArrowUp") {
    playerY -= playerSpeed;
  } else if (event.code === "ArrowDown") {
    playerY += playerSpeed;
  } else if (event.code === "Space") {
    // Get the player's current position in the grid
    const gridX = Math.floor(playerX / blockSize);
    const gridY = Math.floor(playerY / blockSize);
  
    // Toggle the block at the player's current position
    if (grid[gridX][gridY] === 0) {
      grid[gridX][gridY] = 1;
    } else {
      grid[gridX][gridY] = 0;
    }
  }
});

// Main game loop
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
      }
    }
  }
  
  // Draw the player
  ctx.fillStyle = "red";
  ctx.fillRect(playerX, playerY, blockSize, blockSize);
  
  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the game loop
update();
