const messages = [
    "💕 你真是个不可思议又特别的人。谢谢你出现在我的生命里！💕  ",
    "🌟 和你在一起的每一刻，都是我天空中的一颗星星。永不停止闪耀！✨",
    "💖 无论相隔多远，你永远在我心中占据一席之地。💖"
];

function openCard(index) {
    document.getElementById("message").textContent = messages[index];
    document.getElementById("message-box").style.display = "block";
}

function closeMessage() {
    document.getElementById("message-box").style.display = "none";
}

document.getElementById("home-button").addEventListener("click", function() {
    let button = this;
    button.style.animation = "bounce 0.5s"; // Aplica la animación de rebote

    setTimeout(() => {
        window.location.href = "../menu.html"; // Redirige después de la animación
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