const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('finalScore');

let score = 0;
let gameActive = false;

// Bubble class
class Bubble {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

let bubbles = [];

// Create bubbles
function createBubbles() {
    bubbles = [];
    for (let i = 0; i < 10; i++) {
        const radius = 20;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        bubbles.push(new Bubble(x, y, radius, color, dx, dy));
    }
}

// Animation loop
function animate() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => bubble.update());
    requestAnimationFrame(animate);
}

// Start game when the Start Button is clicked
startButton.addEventListener('click', () => {
    gameActive = true;
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    createBubbles();
    animate();
});

// Restart game
restartButton.addEventListener('click', () => {
    gameActive = true;
    gameOverScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    score = 0;
    scoreDisplay.textContent = score;
    createBubbles();
    animate();
});

// Handle clicks on bubbles
canvas.addEventListener('click', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    bubbles.forEach((bubble, index) => {
        const dist = Math.sqrt((mouseX - bubble.x) ** 2 + (mouseY - bubble.y) ** 2);
        if (dist < bubble.radius) {
            bubbles.splice(index, 1);
            score += 10;
            scoreDisplay.textContent = score;
        }
    });

    if (bubbles.length === 0) {
        gameActive = false;
        finalScoreDisplay.textContent = score;
        gameScreen.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
    }
});
