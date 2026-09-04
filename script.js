// ---- настройки контактов: поменяй здесь, если сменится телеграм/текст ----
const TELEGRAM_USERNAME = 'lena_hudoshina';
const PREFILLED_MESSAGE = 'Здравствуйте! Хочу обсудить проект.';

const tgLink = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
document.querySelectorAll('#nav-cta, #hero-cta, #footer-cta').forEach((el) => {
  el.href = tgLink;
});

// ---- аккордеон услуг ----
document.querySelectorAll('.accordion__item').forEach((item) => {
  const head = item.querySelector('.accordion__head');
  const toggle = item.querySelector('.accordion__toggle');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    // закрываем все остальные (классический аккордеон, по одному открытому пункту)
    document.querySelectorAll('.accordion__item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.accordion__toggle').textContent = '+';
      }
    });
    item.classList.toggle('is-open', !isOpen);
    toggle.textContent = !isOpen ? '−' : '+';
  });
});

// ---- мобильное меню ----
const burger = document.getElementById('burger');
const navMobile = document.getElementById('nav-mobile');
burger.addEventListener('click', () => {
  navMobile.classList.toggle('is-open');
});
navMobile.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => navMobile.classList.remove('is-open'));
});

// ---- год в футере ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- карусель кейсов: точки-пагинация ----
const track = document.getElementById('cases-track');
const dots = Array.from(document.querySelectorAll('#cases-dots .dot'));
const slides = Array.from(track.querySelectorAll('.case-slide'));

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  });
});

const setActiveDot = () => {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  let closest = 0;
  let closestDist = Infinity;
  slides.forEach((slide, i) => {
    const dist = Math.abs((slide.offsetLeft + slide.offsetWidth / 2) - trackCenter);
    if (dist < closestDist) { closestDist = dist; closest = i; }
  });
  dots.forEach((d, i) => d.classList.toggle('is-active', i === closest));
};

track.addEventListener('scroll', () => {
  window.requestAnimationFrame(setActiveDot);
});
