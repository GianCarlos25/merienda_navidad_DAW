// --- 1. EFECTO DE NIEVE ---
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
  const particleCount = window.innerWidth < 500 ? 40 : 60;
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());
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

// --- 2. EFECTO DE MAGIA (Chispas) ---
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 800);
}

document.addEventListener(
  "touchmove",
  function (e) {
    const touch = e.touches[0];
    if (Math.random() > 0.7) {
      createSparkle(touch.clientX, touch.clientY);
    }
  },
  { passive: true }
);

document.addEventListener("mousemove", function (e) {
  if (Math.random() > 0.8) {
    createSparkle(e.clientX, e.clientY);
  }
});

// --- 3. TRANSICIÓN DE SALIDA (Mejora de UX) ---
const startBtn = document.getElementById("startBtn");
const mainCard = document.getElementById("mainCard");

startBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Evita navegar inmediatamente
  const targetUrl = this.getAttribute("href");

  // Añade clase de salida
  mainCard.classList.add("exiting");

  // Espera a que termine la animación (0.5s) y navega
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 400);
});
