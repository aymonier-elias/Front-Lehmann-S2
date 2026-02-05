document.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene');
  const light = document.querySelector('#light-cursor');

  if (!scene || !light) return;

  // Plage de mouvement de la lumière (en unités 3D)
  const rangeX = 3;
  const rangeY = 2;
  const zPos = 1;

  function onMouseMove(e) {
    // Normaliser la position de la souris entre -1 et 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -((e.clientY / window.innerHeight) * 2 - 1);

    // Convertir en position 3D (la lumière se déplace dans un plan devant la scène)
    const posX = x * rangeX;
    const posY = y * rangeY;

    light.setAttribute('position', { x: posX, y: posY, z: zPos });
  }

  window.addEventListener('mousemove', onMouseMove);
});
