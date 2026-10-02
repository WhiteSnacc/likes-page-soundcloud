document.getElementById('year').textContent = new Date().getFullYear();

const btn = document.getElementById('langBtn');
const menu = document.getElementById('langMenu');

btn.addEventListener('click', e => {
  e.stopPropagation();
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

menu.querySelectorAll('button').forEach(item => {
  item.addEventListener('click', () => {
    menu.querySelector('.active').classList.remove('active');
    item.classList.add('active');
    btn.textContent = item.textContent;
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', () => menu.classList.remove('open'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') menu.classList.remove('open');
});