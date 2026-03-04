let c = document.querySelector("#c");
let ctx = c.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;
c.width = W;
c.height = H;

let left = false, right = false, up = false, down = false;

// Ecouteur d'événement
window.addEventListener("keydown", appui);
window.addEventListener("keyup", stopAppui);

// Particule
let P = {
  x: W / 2 - 25,
  y: H / 2 - 25,
  vx: 0,
  vy: 0
};

const POUSSEE = 0.4;
const FROTTEMENT = 0.92;
const VITESSEMAX = 8;

boucle();

function appui(envent) {
  switch (envent.key) {
    case "ArrowUp":
      up = true;
      break;
    case "ArrowDown":
      down = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowRight":
      right = true;
      break;
  }
}
function stopAppui(envent) {
  switch (envent.key) {
    case "ArrowUp":
      up = false;
      break;
    case "ArrowDown":
      down = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowRight":
      right = false;
      break;
  }
}
// Boucle qui permet lafficheage en fonction des FPS
function boucle() {
  deplacement();
  afficher();
  window.requestAnimationFrame(boucle);
}

function deplacement() {
  if (up) P.vy -= POUSSEE;
  if (down) P.vy += POUSSEE;
  if (left) P.vx -= POUSSEE;
  if (right) P.vx += POUSSEE;

  // Multipli par le frotment comme >1 diminu
  P.vx *= FROTTEMENT;
  P.vy *= FROTTEMENT; 

  if (P.vx > VITESSEMAX) P.vx = VITESSEMAX;
  if (P.vx < -VITESSEMAX) P.vx = -VITESSEMAX;
  if (P.vy > VITESSEMAX) P.vy = VITESSEMAX;
  if (P.vy < -VITESSEMAX) P.vy = -VITESSEMAX;

  P.x += P.vx;
  P.y += P.vy;
}

function afficher() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillRect(P.x, P.y, 50, 50);
}

function boucle() {
  deplacement();
  afficher();
  requestAnimationFrame(boucle);
}
boucle();
