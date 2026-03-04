let c = document.querySelector("#c");
let ctx = c.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;
c.width = W;
c.height = H;

let left = false,
  right = false,
  up = false,
  down = false;

// Ecouteur d'événement
window.addEventListener("keydown", appui);
window.addEventListener("keyup", stopAppui);

// Particule
let P = {
  x: W / 2 - 25,
  y: H / 2 - 25,
  vx: 0,
  vy: 0,
};

let listPdeco = [];
for (let i = 0; i < 200; i++) {
  let Pdeco = {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5,
  };
  listPdeco.push(Pdeco);
}
const POUSSEE = 0.4;
const FROTTEMENT = 0.92;
const VITESSEMAX = 8;
const DISTANCE_MAX_LIGNE = 120; // distance max pour tracer une ligne entre deux Pdeco

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

  if (P.x < 0) {
    P.x = 0;
    P.vx = -P.vx;
  }
  if (P.x + 50 > W) {
    P.x = W - 50;
    P.vx = -P.vx;
  }
  if (P.y < 0) {
    P.y = 0;
    P.vy = -P.vy;
  }
  if (P.y + 50 > H) {
    P.y = H - 50;
    P.vy = -P.vy;
  }
}

function deplacementPdeco() {
  listPdeco.forEach((Pdeco) => {
    Pdeco.x += Pdeco.vx;
    Pdeco.y += Pdeco.vy;

    if (Pdeco.x < 0) {
      Pdeco.x = 0;
      Pdeco.vx = -Pdeco.vx;
    }
    if (Pdeco.x + 10 > W) {
      Pdeco.x = W - 10;
      Pdeco.vx = -Pdeco.vx;
    }
    if (Pdeco.y < 0) {
      Pdeco.y = 0;
      Pdeco.vy = -Pdeco.vy;
    }
    if (Pdeco.y + 10 > H) {
      Pdeco.y = H - 10;
      Pdeco.vy = -Pdeco.vy;
    }
  });
}

function afficher() {
  ctx.clearRect(0, 0, W, H);

  // Lignes entre Pdeco proches (triangles quand 3 billes sont mutuellement proches)
  for (let i = 0; i < listPdeco.length; i++) {
    for (let j = i + 1; j < listPdeco.length; j++) {
      let a = listPdeco[i];
      let b = listPdeco[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= DISTANCE_MAX_LIGNE) {
        ctx.strokeStyle = "rgba(0, 149, 221, " + (1 - dist / DISTANCE_MAX_LIGNE) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  listPdeco.forEach((Pdeco) => {
    ctx.fillStyle = "#0095DD";
    ctx.beginPath();
    ctx.arc(Pdeco.x, Pdeco.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });
  ctx.fillStyle = "#000";
  ctx.fillRect(P.x, P.y, 50, 50);
}

function boucle() {
  deplacement();
  deplacementPdeco();
  afficher();
  requestAnimationFrame(boucle);
}
boucle();
