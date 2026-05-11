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
}, { threshold: 0.6 });

document.querySelectorAll('.fade-up, .info__counters, .result__list, .trainers__list, .pack__list').forEach(el => observer.observe(el));

// Счетчик
document.addEventListener('DOMContentLoaded', () => {
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 70;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 40); 
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterElement = entry.target;
        const target = parseInt(counterElement.dataset.target);
        animateCounter(counterElement, target);
        observer.unobserve(counterElement);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.info__count').forEach(counter => {
    observer.observe(counter);
  });
});