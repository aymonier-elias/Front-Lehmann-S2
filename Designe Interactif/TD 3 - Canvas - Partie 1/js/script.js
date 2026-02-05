/* Init canvas */
const c = document.querySelector("#premierPlan");
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

/* Initialisation particule */
let P = {
    x: Math.random()*W,
    y: Math.random()*H,
    vx: 0,
    vy: 0
}

/* Config */
let vitesse = 1;

/* Durée de la frame */
let temps1 = performance.now();

/* On démarre la boucle */
boucle();

function appui(event) {
    switch(event.key) {
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
    switch(event.key) {
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
    moteur();
    afficher();
    window.requestAnimationFrame(boucle);
}

function moteur() {
    /* On remet la vitesse à 0 */
    P.vx = 0;
    P.vy = 0;

    /* On calcule la vitesse en fonction des touches appuiées*/
    if(left) P.vx -= vitesse;
    if(right) P.vx += vitesse;
    if(up) P.vy -= vitesse;
    if(down) P.vy += vitesse;

    /* Calcul de la durée d'une frame */
    let temps2 = performance.now();
    let duree = temps2 - temps1;
    temps1 = temps2;

    /* Application de la vitesse sur la position en fonction de la durée de la frame */
    P.x += P.vx*duree;
    P.y += P.vy*duree;
}

function afficher() {
    ctx.clearRect(0,0,W,H);
    ctx.fillRect(P.x, P.y, 50, 50);
}