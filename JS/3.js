let score = 0;
const goal = 20; // Número de clics necesarios para desbloquear el mensaje

document.getElementById("heart").addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;

    if (score >= goal) {
        document.getElementById("message").textContent = "💘 ¡Has llenado el medidor de amor! 💘";
    }
});

document.getElementById("reset-btn").addEventListener("click", () => {
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "";
});

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