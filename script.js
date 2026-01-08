const viewer = document.getElementById('viewer');
const pano = document.getElementById('pano');
const imgs = pano.querySelectorAll('img');

let isDown = false;
let startX = 0;
let offsetX = 0;
let panoWidth = 0;
let sensitivity = 1;

window.addEventListener('load', () => {
  panoWidth = imgs[0].getBoundingClientRect().width;
});

viewer.addEventListener('pointerdown', (e) => {
  e.preventDefault();              // ⭐ 중요
  isDown = true;
  startX = e.clientX;
  sensitivity = e.pointerType === 'touch' ? 3 : 1;
  viewer.setPointerCapture(e.pointerId);
  viewer.style.cursor = 'grabbing';
}, { passive: false });

viewer.addEventListener('pointermove', (e) => {
  if (!isDown || !panoWidth) return;

  const dx = (e.clientX - startX) * sensitivity;
  startX = e.clientX;
  offsetX += dx;

  offsetX = ((offsetX % panoWidth) + panoWidth) % panoWidth - panoWidth;
  pano.style.transform = `translateX(${offsetX}px)`;
});

viewer.addEventListener('pointerup', (e) => {
  isDown = false;
  viewer.releasePointerCapture(e.pointerId);
  viewer.style.cursor = 'grab';
});

viewer.addEventListener('pointercancel', () => {
  isDown = false;
  viewer.style.cursor = 'grab';
});
