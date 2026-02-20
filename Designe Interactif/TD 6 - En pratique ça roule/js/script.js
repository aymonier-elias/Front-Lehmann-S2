const c = document.querySelector("canvas");
const ctx = c.getContext("2d");

/* Taille écran */
let W = window.innerWidth;
let H = window.innerHeight;

/* Définition de la taille du canvas */
c.width = W;
c.height = H;

/* Variables pour les touches enfoncées ou non */
let left = false;
let right = false;
let up = false;
let down = false;

/* EventListener pour voir si on a appuié */
window.addEventListener("keydown", appui);
window.addEventListener("keyup", stopAppui);

/* Bille - position et vélocité */
let P = {
  x: W / 2 - 25,
  y: H / 2 - 25,
  vx: 0,
  vy: 0,
};

let poussee = 0.5;
let frotement = 0.1;
let pousseeMax = 10;

/* On démarre la boucle */
boucle();

function appui(event) {
  switch (event.key) {
    case "ArrowUp":
      up = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowRight":
      right = true;
      break;
    case "ArrowDown":
      down = true;
      break;
  }
}
function stopAppui(event) {
  switch (event.key) {
    case "ArrowUp":
      up = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowRight":
      right = false;
      break;
    case "ArrowDown":
      down = false;
      break;
  }
}

function boucle() {
  mouvement();
  afficher();
  window.requestAnimationFrame(boucle);
}

function mouvement() {
  if (up) {
    P.vy -= poussee;
  }
  if (down) {
    P.vy += poussee;
  }
  if (left) {
    P.vx -= poussee;
  }
  if (right) {
    P.vx += poussee;
  }

  if (P.vx >= 0) {
    P.vx -= frotement;
  }
  if (P.vy >= 0) {
    P.vy -= frotement;
  }
  if (P.vx <= 0) {
    P.vx += frotement;
  }
  if (P.vy <= 0) {
    P.vy += frotement;
  }

  P.x += P.vx;
  P.y += P.vy;
}

function afficher() {
  ctx.clearRect(0, 0, W, H);
  ctx.beginPath();
  ctx.arc(P.x, P.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
