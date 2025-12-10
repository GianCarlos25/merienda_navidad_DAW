// --- DATOS DEL MENÚ (Bebidas) ---
let questions = [
  {
    id: 1,
    title: "Bebida 1",
    desc: "Intenso, moderno y servido en una taza con QR que nadie consigue escanear. Ideal para despertarte… si el WiFi colabora.",
    // Imagen: Café
    img: "images/bebidas/cafeDigitalizacion.png",
    realDish: "Café de Digitalización Aplicada al Sistema Productivo",
    realDesc:
      "Intenso, moderno y servido en una taza con QR que nadie consigue escanear. Ideal para despertarte… si el WiFi colabora.",
    options: [
      { text: "Té de Gestión de Recursos Humanos", correct: false },
      { text: "Malteada de Desarrollo de Aplicaciones", correct: false },
      { text: "Limonada de Sostenibilidad Aplicada", correct: false },
      {
        text: "Café de Digitalización Aplicada al Sistema Productivo",
        correct: true,
      },
    ],
  },
  {
    id: 2,
    title: "Bebida 2",
    desc: "Fresca, con huella de carbono cero y sabor eco-friendly. Perfecta para beber despacio y reciclar con responsabilidad.",
    // Imagen: Limonada
    img: "images/bebidas/limonadaSostenibilidad.png",
    realDish: "Limonada de Sostenibilidad Aplicada al Sistema Productivo",
    realDesc:
      "Fresca, con huella de carbono cero y sabor eco-friendly. Perfecta para beber despacio y reciclar con responsabilidad.",
    options: [
      { text: "Té de Gestión de Recursos Humanos", correct: false },
      { text: "Malteada de Desarrollo de Aplicaciones", correct: false },
      {
        text: "Limonada de Sostenibilidad Aplicada al Sistema Productivo",
        correct: true,
      },
      { text: "Café de Digitalización Aplicada", correct: false },
    ],
  },
  {
    id: 3,
    title: "Bebida 3",
    desc: "Batido adaptable a cualquier vaso, copa o recipiente. Cambia de sabor según el sistema operativo donde la bebas.",
    // Imagen: Batido/Malteada
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    realDish: "Malteada de Desarrollo de Aplicaciones Multiplataforma",
    realDesc:
      "Batido adaptable a cualquier vaso, copa o recipiente. Cambia de sabor según el sistema operativo donde la bebas.",
    options: [
      { text: "Té de Gestión de Recursos Humanos", correct: false },
      {
        text: "Malteada de Desarrollo de Aplicaciones Multiplataforma",
        correct: true,
      },
      { text: "Limonada de Sostenibilidad Aplicada", correct: false },
      { text: "Café de Digitalización Aplicada", correct: false },
    ],
  },
  {
    id: 4,
    title: "Bebida 4",
    desc: "Suave, cálido y perfectamente infundido. Viene con una galleta en forma de “evaluación del desempeño”.",
    // Imagen: Té
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    realDish: "Té de Gestión de Recursos Humanos",
    realDesc:
      "Suave, cálido y perfectamente infundido. Viene con una galleta en forma de “evaluación del desempeño”.",
    options: [
      { text: "Té de Gestión de Recursos Humanos", correct: true },
      { text: "Malteada de Desarrollo de Aplicaciones", correct: false },
      { text: "Limonada de Sostenibilidad Aplicada", correct: false },
      { text: "Café de Digitalización Aplicada", correct: false },
    ],
  },
];

let currentStep = 0;
let isProcessing = false;

// --- RENDERIZADO DEL JUEGO ---
const gameArea = document.getElementById("gameArea");
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const progress = (currentStep / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function renderCard() {
  updateProgress();

  if (currentStep >= questions.length) {
    showFinal();
    return;
  }

  const q = questions[currentStep];
  const blurAmount = 12;

  // Animación de salida
  gameArea.style.opacity = 0;
  gameArea.style.transform = "translateY(10px)";

  setTimeout(() => {
    gameArea.innerHTML = `
                    <div class="dish-reveal">
                        <img src="${
                          q.img
                        }" style="filter: blur(${blurAmount}px)" id="dishImg">
                    </div>
                    
                    <h2 class="question-title">${q.title}</h2>
                    <p class="question-text">${q.desc}</p>
                    
                    <div class="options-stack">
                        ${q.options
                          .map(
                            (opt) => `
                            <button class="option-btn" onclick="checkAnswer(this, ${opt.correct})">
                                ${opt.text}
                            </button>
                        `
                          )
                          .join("")}
                    </div>
                `;
    // Animación de entrada
    gameArea.style.opacity = 1;
    gameArea.style.transform = "translateY(0)";
    isProcessing = false;
  }, 400);
}

// --- LÓGICA DE RESPUESTA ---
window.checkAnswer = function (btn, isCorrect) {
  if (isProcessing) return;
  isProcessing = true;

  const img = document.getElementById("dishImg");

  if (isCorrect) {
    // --- ACIERTO ---
    btn.classList.add("correct");
    img.style.filter = "blur(0px)";
    triggerStamp("CORRECTO", "--stamp-green");
    if (navigator.vibrate) navigator.vibrate(50);

    setTimeout(() => {
      currentStep++;
      renderCard();
    }, 1500);
  } else {
    // --- FALLO ---
    btn.classList.add("wrong");
    img.style.filter = "blur(6px)";
    triggerStamp("INCORRECTO", "--stamp-red");
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

    setTimeout(() => {
      btn.classList.remove("wrong");
      isProcessing = false;
    }, 800);
  }
};

function triggerStamp(text, colorVar) {
  const stamp = document.getElementById("stamp");
  stamp.innerText = text;
  stamp.style.borderColor = `var(${colorVar})`;
  stamp.style.color = `var(${colorVar})`;

  stamp.classList.remove("stamped");
  void stamp.offsetWidth;
  stamp.classList.add("stamped");

  setTimeout(() => {
    stamp.classList.remove("stamped");
  }, 1500);
}

function showFinal() {
  isProcessing = false;
  progressBar.style.width = "100%";
  gameArea.style.display = "none";
  document.getElementById("finalArea").style.display = "block";

  // Generar Resumen con los platos REALES y sus DESCRIPCIONES
  const list = document.getElementById("summaryList");
  list.innerHTML = questions
    .map(
      (q) => `
                <div class="summary-item">
                    <div class="check-icon">✨</div>
                    <div class="item-content">
                        <div class="item-title">${q.realDish}</div>
                        <div class="item-desc">${q.realDesc}</div>
                    </div>
                </div>
            `
    )
    .join("");

  // --- CONFETTI ---
  // Lanzar confetti como si hubieras ganado
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

// --- EFECTO DE NIEVE ---
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) this.y = -5;
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 40; i++) particles.push(new Particle());
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
renderCard();
