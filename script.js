const cards = document.querySelectorAll(".card");
const rewards = [
  { value: "₦500", img: "1.png", weight: 4 },
  { value: "₦1000", img: "2.png", weight: 4 },
  { value: "₦1200", img: "3.png", weight: 3 },
  { value: "₦1500", img: "4.png", weight: 2 },
  { value: "₦2000", img: "5.png", weight: 1 },
  { value: "₦2500", img: "6.png", weight: 1 },
];

let flipped = false;

function getWeightedReward() {
  let weighted = [];
  rewards.forEach(r => {
    for (let i = 0; i < r.weight; i++) {
      weighted.push(r);
    }
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    if (flipped) return;

    flipped = true;
    const sound = document.getElementById("flipSound");
    sound.play();

    const reward = getWeightedReward();
    const img = card.querySelector("img");

    // Thời gian lật thẻ: 2 giây
    setTimeout(() => {
      img.src = `images/${reward.img}`;
      showPopup(reward.value);
    }, 2000);
  });
});

function showPopup(value) {
  const popup = document.getElementById("popup");
  const message = document.getElementById("popup-message");
  message.innerHTML = `🎉 Congratulations! You won <strong>${value}</strong>!`;
  popup.style.display = "flex";

  // 🎊 Gọi hiệu ứng Confetti
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });

  // Ẩn popup sau 3 giây
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}


function replay() {
  location.reload();
}
function fireConfetti() {
  var duration = 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const particles = [];

  for (let i = 0; i < 30; i++) {
    particles.push({
      x: x,
      y: y,
      radius: 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01,
    });
  }

  fireworks.push(particles);
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particles, index) => {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
      ctx.fill();
    });

    // Remove faded out particles
    fireworks[index] = particles.filter(p => p.alpha > 0);
  });

  fireworks = fireworks.filter(p => p.length > 0);

  requestAnimationFrame(animateFireworks);
}

// Helper: Convert HSL to RGB
function hexToRgb(hsl) {
  const temp = document.createElement('div');
  temp.style.color = hsl;
  document.body.appendChild(temp);
  const rgb = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  return rgb.match(/\d+/g).join(', ');
}

// Tạo pháo hoa định kỳ
setInterval(createFirework, 1500);
animateFireworks();

// Resize canvas khi cửa sổ thay đổi
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
