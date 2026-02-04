const player = document.querySelector(".player");

// Position initiale du joueur
let playerX = 0;
let playerY = 0;

// Vélocité actuelle
let velocityX = 0;
let velocityY = 0;

// Constantes pour l'accélération et la décélération
const maxSpeed = 8; // Vitesse maximale
const acceleration = 0.5; // Taux d'accélération
const deceleration = 1; // Taux de décélération

// Objet pour stocker l'état des touches
const keysPressed = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

// Écouter quand une touche est pressée
window.addEventListener("keydown", (event) => {
    if (keysPressed.hasOwnProperty(event.key)) {
        keysPressed[event.key] = true;
    }
});

// Écouter quand une touche est relâchée
window.addEventListener("keyup", (event) => {
    if (keysPressed.hasOwnProperty(event.key)) {
        keysPressed[event.key] = false;
    }
});

// Fonction pour déplacer le joueur en fonction des touches pressées
function updatePlayerPosition() {
    // Accélération horizontale
    if (keysPressed.ArrowLeft) {
        velocityX = Math.max(velocityX - acceleration, -maxSpeed);
    } else if (keysPressed.ArrowRight) {
        velocityX = Math.min(velocityX + acceleration, maxSpeed);
    } else {
        // Décélération horizontale
        if (velocityX > 0) {
            velocityX = Math.max(velocityX - deceleration, 0);
        } else if (velocityX < 0) {
            velocityX = Math.min(velocityX + deceleration, 0);
        }
    }

    // Accélération verticale
    if (keysPressed.ArrowUp) {
        velocityY = Math.max(velocityY - acceleration, -maxSpeed);
    } else if (keysPressed.ArrowDown) {
        velocityY = Math.min(velocityY + acceleration, maxSpeed);
    } else {
        // Décélération verticale
        if (velocityY > 0) {
            velocityY = Math.max(velocityY - deceleration, 0);
        } else if (velocityY < 0) {
            velocityY = Math.min(velocityY + deceleration, 0);
        }
    }

    // Appliquer la vélocité à la position
    playerX += velocityX;
    playerY += velocityY;

    // Calculer la vitesse totale pour l'effet squeeze
    const totalSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    const speedRatio = totalSpeed / maxSpeed; // Ratio entre 0 et 1

    // Appliquer les nouvelles positions
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    // Effet de squeeze basé sur la vitesse
    if (totalSpeed > 0.1) {
        // Intensité du squeeze (plus la vitesse est élevée, plus le squeeze est fort)
        const squeezeIntensity = speedRatio * 0.25; // Max 25% de compression
        
        // Calculer les composantes normalisées de la vélocité
        const normalizedX = velocityX / totalSpeed;
        const normalizedY = velocityY / totalSpeed;
        
        // Compression perpendiculaire à la direction du mouvement
        // Étirement dans la direction du mouvement
        const scaleX = 1 + Math.abs(normalizedX) * squeezeIntensity * 0.4 - Math.abs(normalizedY) * squeezeIntensity;
        const scaleY = 1 + Math.abs(normalizedY) * squeezeIntensity * 0.4 - Math.abs(normalizedX) * squeezeIntensity;
        
        player.style.transform = `scale(${scaleX}, ${scaleY})`;
        player.style.transition = "transform 0.05s ease-out";
    } else {
        // Retour à la forme normale quand on s'arrête
        player.style.transform = "scale(1, 1)";
        player.style.transition = "transform 0.2s ease-out";
    }
}

// Utiliser setInterval pour un mouvement fluide (60 FPS)
setInterval(updatePlayerPosition, 1000 / 60);