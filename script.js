// Бургер меню
const burger = document.querySelector('.burger');

burger.addEventListener('click', function() {
  const burgerItems = document.querySelectorAll('.burger__item');
  const menu = document.querySelector('.menu__nav ');
  const overlay = document.querySelector('.overlay');

  burgerItems.forEach((item) => {
    item.classList.toggle('burger__item--active');
  })

  menu.classList.toggle('menu__nav--active');

  overlay.classList.toggle('overlay--active');

  document.body.classList.toggle('no-scroll');
})


// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('info__counters')
          || entry.target.classList.contains('result__list')
          || entry.target.classList.contains('trainers__list')
          || entry.target.classList.contains('pack__list')) {

            const cards = entry.target.querySelectorAll('.info__counters-card,.result__item, .trainers__item, .pack__item');

            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animation-on-scroll');
              }, index * 550);
            });
          } else {
            entry.target.classList.add('animation-on-scroll');
          }

        observer.unobserve(entry.target);
      }
    });
}, { threshold: 1 });

document.querySelectorAll('.fade-up, .info__counters, .result__list, .trainers__list, .pack__list').forEach(el => observer.observe(el));