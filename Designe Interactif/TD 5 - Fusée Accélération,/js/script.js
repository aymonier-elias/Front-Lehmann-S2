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

/* Fusée - position, vélocité et orientation */
let P = {
    x: W / 2 - 25,
    y: H / 2 - 25,
    vx: 0,
    vy: 0,
    angle: 0   // 0 = pointe vers le haut, radians
}

/* Config physique - tout synchronisé pour un vol proche de la Terre */
// Gravité terrestre (pixels/frame²) - tire la fusée vers le bas
let gravite = 0.15;

// Poussée du moteur - doit pouvoir vaincre la gravité pour monter
let poussee = 0.25;

// Vitesse max pour éviter que la fusée parte trop vite
let vitesseMax = 5;

// Vitesse de rotation (radians/frame)
let rotationVitesse = 0.06;

// Légère friction pour stabiliser les mouvements
let friction = 0.98;

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
    /* Rotation : gauche/droite font tourner la fusée */
    if (left) P.angle -= rotationVitesse;
    if (right) P.angle += rotationVitesse;

    /* Gravité : tire toujours la fusée vers le bas */
    P.vy += gravite;

    /* Poussée du moteur : pousse dans la direction où pointe la fusée */
    if (up) {
        P.vx += Math.sin(P.angle) * poussee;   // Poussée vers l'avant (direction de la fusée)
        P.vy -= Math.cos(P.angle) * poussee;
    }
    if (down) {
        P.vx -= Math.sin(P.angle) * poussee;   // Poussée arrière (frein)
        P.vy += Math.cos(P.angle) * poussee;
    }

    /* Limiter la vitesse max (éviter une fusée incontrôlable) */
    let vitesse = Math.sqrt(P.vx * P.vx + P.vy * P.vy);
    if (vitesse > vitesseMax) {
        P.vx = (P.vx / vitesse) * vitesseMax;
        P.vy = (P.vy / vitesse) * vitesseMax;
    }

    /* Légère friction pour fluidité et stabilité */
    P.vx *= friction;
    P.vy *= friction;

    /* Calcul de la durée d'une frame (normalisé ~60fps) */
    let temps2 = performance.now();
    let duree = (temps2 - temps1) / 16.67;
    temps1 = temps2;

    /* Application de la vélocité sur la position */
    P.x += P.vx * duree;
    P.y += P.vy * duree;

    /* Garder la fusée dans les limites de l'écran */
    P.x = Math.max(0, Math.min(W - 50, P.x));
    P.y = Math.max(0, Math.min(H - 50, P.y));
    if (P.x <= 0 || P.x >= W - 50) P.vx = 0;
    if (P.y <= 0 || P.y >= H - 50) P.vy = 0;
}

function afficher() {
    ctx.clearRect(0, 0, W, H);

    /* Dessiner la fusée avec rotation */
    ctx.save();
    ctx.translate(P.x + 25, P.y + 25);   // Centre du rectangle
    ctx.rotate(P.angle);
    ctx.translate(-25, -25);             // Revenir au coin pour fillRect
    ctx.fillRect(0, 0, 50, 50);
    ctx.restore();
}