const m4 = {
  perspective: (fovy, aspect, zNear, zFar) => {
    const f = 1.0 / Math.tan(fovy / 2);
    const rangeInv = 1 / (zNear - zFar);
    
    return [      f / aspect, 0, 0, 0,      0, f, 0, 0,      0, 0, (zNear + zFar) * rangeInv, -1,      0, 0, zNear * zFar * rangeInv * 2, 0    ];
  },
  
  lookAt: (out, eye, center, up) => {
    const x0 = eye[0], x1 = center[0], x2 = up[0],
          y0 = eye[1], y1 = center[1], y2 = up[1],
          z0 = eye[2], z1 = center[2], z2 = up[2],
          len = 1 / Math.hypot(x0 - x1, y0 - y1, z0 - z1);
    
    const sx = (x0 - x1) * len;
    const sy = (y0 - y1) * len;
    const sz = (z0 - z1) * len;
    
    const ux = (y2 * sz) - (z2 * sy);
    const uy = (z2 * sx) - (x2 * sz);
    const uz = (x2 * sy) - (y2 * sx);
    
    const vx = (sy * uz) - (sz * uy);
    const vy = (sz * ux) - (sx * uz);
    const vz = (sx * uy) - (sy * ux);
    
    out[0] = ux;
    out[1] = vx;
    out[2] = sx;
    out[3] = 0;
    
    out[4] = uy;
    out[5] = vy;
    out[6] = sy
//code is below
    const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("webgl");

// Set the size of the canvas
canvas.width = 500;
canvas.height = 500;

// Set the field of view, aspect ratio, and near and far planes for the camera
const fov = 45;
const aspect = canvas.width / canvas.height;
const near = 0.1;
const far = 100;

// Set the player's starting position and rotation
let playerX = 0;
let playerY = 0;
let playerZ = 0;
let yaw = 0;
let pitch = 0;

// Set the player's movement speed in blocks per second
const playerSpeed = 1;

// Set the player's mouse sensitivity
const mouseSensitivity = 0.01;

// Create an empty 3D grid
const gridSize = 50;
const grid = [];
for (let i = 0; i < gridSize; i++) {
  grid[i] = [];
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = [];
    for (let k = 0; k < gridSize; k++) {
      grid[i][j][k] = 0;
    }
  }
}

// Generate the blocks using a perlin noise scheme
const noiseScale = 10;
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    for (let k = 0; k < gridSize; k++) {
      const noise = simplex.noise3D(i / noiseScale, j / noiseScale, k / noiseScale);
      if (noise > 0) {
        grid[i][j][k] = 1;
      }
    }
  }
}

// Set up the camera projection matrix
const projectionMatrix = m4.perspective(fov, aspect, near, far);

// Set up the view matrix
const viewMatrix = m4.identity();

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyW") {
    // Move the player forward
    const direction = m4.zRotation(yaw);
    playerX += direction[8] * playerSpeed;
    playerZ += direction[10] * playerSpeed;
  } else if (event.code === "KeyS") {
    // Move the player backward
    const direction = m4.zRotation(yaw);
    playerX -= direction[8] * playerSpeed;
    playerZ -= direction[10] * playerSpeed;
  } else if (event.code === "KeyA") {
    // Strafe the player to the left
    const direction = m4.zRotation(yaw + Math.PI / 2);
    playerX += direction[8] * playerSpeed;
    playerZ += direction[10] * playerSpeed;
  } else if (event.code === "KeyD") {
    // Strafe the player to the right
    const direction = m4.zRotation(yaw + Math.PI / 2);
    playerX -= direction[8] * playerSpeed;
    playerZ -= direction[10] * playerSpeed;
  }
});

// Handle mouse input
let lastMouseX = 0;
let lastMouseY = 0;
document.addEventListener("mousedown", (event) => {
  // Get the player's current position in the grid
  const gridX = Math.floor(playerX);
  const gridY = Math.floor(playerY);
  const gridZ = Math.floor(playerZ);
  
  if (event.button === 0) {
    // Break the block in front of the player
    const direction = m4.zRotation(yaw);
    const x = gridX + direction[8];
    const y = gridY + direction[9];
    const z = gridZ + direction[10];
    if (grid[x][y][z] === 1) {
      grid[x][y][z] = 0;
    }
  } else if (event.button === 2) {
    // Place a green block in front of the player
    const direction = m4.zRotation(yaw);
    const x = gridX + direction[8];
    const y = gridY + direction[9];
    const z = gridZ + direction[10];
    if (grid[x][y][z] === 0) {
      grid[x][y][z] = 2;
    }
  }
});
document.addEventListener("mousemove", (event) => {
  // Calculate the mouse movement since the last frame
  const dx = event.clientX - lastMouseX;
  const dy = event.clientY - lastMouseY;
  
  // Update the player's yaw and pitch
  yaw += dx * mouseSensitivity;
  pitch += dy * mouseSensitivity;
  
  // Clamp the pitch to prevent the player from flipping over
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  
  // Store the current mouse position for the next frame
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
});

// Main game loop
function update() {
  // Clear the canvas
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
  
  // Set up the view matrix
  m4.lookAt(viewMatrix, playerX, playerY, playerZ, playerX + Math.cos(yaw) * Math.cos(pitch), playerY + Math.sin(pitch), playerZ + Math.sin(yaw) * Math.cos(pitch), 0, 1, 0);
  
  // Draw the blocks
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      for (let k = 0; k < gridSize; k++) {
        if (grid[i][j][k] > 0) {
          // Set the model matrix for this block
          const modelMatrix = m4.translation(i, j, k);
          // Set the color for this block
          if (grid[i][j][k] === 1) {
            ctx.uniform4f(colorLocation, 0.5, 0.5, 0.5, 1);
          } else if (grid[i][j][k] === 2) {
            ctx.uniform4f(colorLocation, 0, 1, 0, 1);
          }
          
          // Set the model-view-projection matrix and draw the block
          ctx.uniformMatrix4fv(mvpLocation, false, m4.multiply(projectionMatrix, m4.multiply(viewMatrix, modelMatrix)));
          ctx.drawElements(ctx.TRIANGLES, indices.length, ctx.UNSIGNED_SHORT, 0);
        }
      }
    }
  }
  
  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the game loop
update();
