const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 600;

const bubbleRadius = 20;
const shooterWidth = 80;
const shooterHeight = 20;
const bubbleSpeed = 5;

let shooterX = canvas.width / 2 - shooterWidth / 2;
let bubbles = [];
let score = 0;

// Draw the shooter
function drawShooter() {
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(shooterX, canvas.height - shooterHeight, shooterWidth, shooterHeight);
}

// Draw bubbles
function drawBubbles() {
  bubbles.forEach((bubble, index) => {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubbleRadius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.closePath();

    // Move bubble
    bubble.y -= bubbleSpeed;

    // Remove bubble if it goes off screen
    if (bubble.y + bubbleRadius < 0) {
      bubbles.splice(index, 1);
    }
  });
}

// Shoot a bubble
function shootBubble() {
  const bubble = {
    x: shooterX + shooterWidth / 2,
    y: canvas.height - shooterHeight,
    color: getRandomColor(),
  };
  bubbles.push(bubble);
}

// Get random color
function getRandomColor() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShooter();
  drawBubbles();
  requestAnimationFrame(gameLoop);
}

// Move shooter with touch or mouse
canvas.addEventListener('touchmove', (e) => {
  const touchX = e.touches[0].clientX - canvas.offsetLeft;
  shooterX = touchX - shooterWidth / 2;
});

canvas.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX - canvas.offsetLeft;
  shooterX = mouseX - shooterWidth / 2;
});

// Shoot bubble on tap or click
canvas.addEventListener('touchstart', () => shootBubble());
canvas.addEventListener('click', () => shootBubble());

// Start the game
gameLoop();
