const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");

let score = 0;
let timeLeft = 30;
let gameRunning = true;
const popSound = new Audio("pop.mp3");
let hearts = [];
let playerX = window.innerWidth / 2 - 25;

// Movimiento con teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movePlayer(-20);
    if (e.key === "ArrowRight") movePlayer(20);
});

// Movimiento táctil
let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});
document.addEventListener("touchmove", (e) => {
    let deltaX = e.touches[0].clientX - touchStartX;
    movePlayer(deltaX);
    touchStartX = e.touches[0].clientX;
});

function movePlayer(delta) {
    playerX = Math.max(0, Math.min(window.innerWidth - 50, playerX + delta));
    player.style.left = `${playerX}px`;
}

// Crear corazones
function createHeart() {
    if (!gameRunning) return;
    
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    heart.style.top = "0px";
    gameArea.appendChild(heart);
    hearts.push(heart);

    moveHeart(heart);
}

function moveHeart(heart) {
    let heartPosition = 0;
    const heartFall = setInterval(() => {
        if (!gameRunning) return clearInterval(heartFall);

        heartPosition += 5;
        heart.style.top = `${heartPosition}px`;

        const playerRect = player.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (
            heartRect.bottom >= playerRect.top &&
            heartRect.left >= playerRect.left &&
            heartRect.right <= playerRect.right
        ) {
            popSound.play();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(heartFall);
            heart.remove();
            hearts = hearts.filter(h => h !== heart);
        }

        if (heartPosition > window.innerHeight) {
            clearInterval(heartFall);
            heart.remove();
            hearts = hearts.filter(h => h !== heart);
        }
    }, 50);
}

// Temporizador
function updateTimer() {
    if (!gameRunning) return;

    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        endGame();
    } else {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    }
}

// Fin del juego
function endGame() {
    gameRunning = false;
    finalScore.textContent = score;
    gameOverScreen.style.display = "block";
}

// Reiniciar juego
function restartGame() {
    gameRunning = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    gameOverScreen.style.display = "none";

    // Eliminar corazones viejos
    hearts.forEach(heart => heart.remove());
    hearts = [];

    updateTimer();
}

// Iniciar juego
updateTimer();
setInterval(createHeart, 1000);


document.getElementById("home-button").addEventListener("click", function() {
    let button = this;
    button.style.animation = "bounce 0.5s"; // Aplica la animación de rebote

    setTimeout(() => {
        window.location.href = "../index.html"; // Redirige después de la animación
    }, 500);
});

/* Agrega la animación en CSS */
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);