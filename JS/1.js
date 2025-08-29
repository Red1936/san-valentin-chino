const questions = [
    {
        question: "¿Cuál es el color del cielo en un día despejado?",
        options: ["Rojo", "Azul", "Verde", "Amarillo"],
        correct: "Azul"
    },
    {
        question: "¿Cuánto es 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "¿Qué animal dice 'miau'?",
        options: ["Perro", "Gato", "Vaca", "Pájaro"],
        correct: "Gato"
    }
];

let currentQuestionIndex = 0;
const questionText = document.getElementById("question-text");
const optionsContainer = document.querySelector(".options");
const message = document.getElementById("message");
const nextButton = document.getElementById("next-question");
const restartButton = document.getElementById("restart");
const finalMessage = document.getElementById("final-message");
const restartFinalButton = document.getElementById("restart-final");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = ""; // Limpiar opciones
    message.textContent = ""; // Limpiar mensaje
    nextButton.style.display = "none"; // Ocultar el botón al cargar una nueva pregunta

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.dataset.correct = option === currentQuestion.correct;
        
        button.addEventListener("click", checkAnswer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Desactivar todos los botones para evitar más clics
    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);

    if (isCorrect) {
        selectedButton.classList.add("correct");
        message.innerHTML = "✨ ¡Bien hecho! ¡Eres increíble! ✨";
        nextButton.style.display = "block"; // Mostrar el botón de siguiente solo si es correcto
    } else {
        selectedButton.classList.add("wrong");
        message.innerHTML = "😢 ¡Oh no! Pero no te rindas 💖";
    }
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").style.display = "none";
        finalMessage.style.display = "block";
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    loadQuestion();
});

restartFinalButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    finalMessage.style.display = "none";
    document.querySelector(".quiz-container").style.display = "block";
    loadQuestion();
});

loadQuestion();


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