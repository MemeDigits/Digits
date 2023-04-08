const canvas = document.getElementById('firework');
const ctx = canvas.getContext('2d');

let particles = [];
let particleCount = 150;
let particleRadius = 2;
let explosionPower = 5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = Math.random() * explosionPower;
    this.distanceFromCenter = Math.random() * 80 + 50;
    this.lastMouse = {
      x: x,
      y: y
    };
  }

  draw(lastPoint) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = particleRadius;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  }

  update(lastPoint) {
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.radians += this.velocity * 0.01;
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  }
}

function createParticles(x, y) {
  let hue = Math.random() * 360;
  let color = `hsl(${hue}, 100%, 50%)`;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update(particles[index - 1]);
  });
}

let mouse = {
  x: 0,
  y: 0
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('click', (event) => {
  createParticles(event.clientX, event.clientY);
});

animate();
