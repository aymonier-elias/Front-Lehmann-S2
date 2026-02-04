const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let W, H;
tailCanvas();

// Gestion du canvas
window.requestAnimationFrame(affichage);
window.addEventListener("resize", tailCanvas);

function tailCanvas() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}

controler();

// gestion des controle du joueur
function controler() {
  window.addEventListener("keydown", (key) => {
    switch (key.key) {
      case "ArrowDown":
        console.log("oui tu a appuiyer sur" + key.key);
        break;
      case "ArrowUp":
        console.log("oui tu a appuiyer sur" + key.key);
        break;
      case "ArrowLeft":
        console.log("oui tu a appuiyer sur" + key.key);
        break;
      case "ArrowRight":
        console.log("oui tu a appuiyer sur" + key.key);
        break;

      default:
        break;
    }
  });

  let vitesse = 0;
  function playerMouvement(direction) {}
}

// Affichage du jeux
function affichage() {
  ctx.fillStyle = "rgb(0,255,0)";
  ctx.fillRect(40, 40, 100, 100);

  ctx.lineWidth = 10;

  window.requestAnimationFrame(affichage);
  controler();
}
