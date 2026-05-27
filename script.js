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

// Валидация и отправка формы
const form = document.querySelector('.discont__form');

emailjs.init("IJ8fDZ_dk-CQ31YJn");

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let isValid = true;

  clearError();

  const name = document.getElementById('formName').value;
  const phone = document.getElementById('formPhone').value;
  const email = document.getElementById('formEmail').value;

  // Проверка имени
  if(name === '') {
      showError('Ошибка имени', 'Введите имя.');
      isValid = false;
      return;
  } else if(name.length <= 2) {
      showError('Ошибка имени', 'Неккоректно введено имя');
      isValid = false;
      return;
  } else if(name[0] !== name[0].toUpperCase()) {
      showError('Ошибка имени', 'Имя должно быть с заглавной буквы');
      isValid = false;
      return;
  } else if(name === name.toUpperCase()) {
      showError('Ошибка имени', 'Все буквы с заглавной буквы. Проверьте CAPS LOCK');
      isValid = false;
      return;
  }

  // Проверка телефона
  const phonePatternFirst = /^375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
  const phonePatternSecond = /^375\d{9}$/;

  if(phone === '') {
      showError('Ошибка телефона', 'Введите номер телефона');
      isValid = false;
      return;
  } else if(phone[0] !== '+') {
      showError('Ошибка телефона', 'Номер телефона должен начинаться с "+"');
      isValid = false;
      return;
    } else if(phonePatternFirst.test(phone) || phonePatternSecond.test(phone)) {
      showError('Ошибка телефона', 'Некорректно введен номер телефона');
      isValid = false;
      return;
  }

  // Проверка почты
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email === '') {
      showError('Ошибка почты', 'Введите E-mail');
      isValid = false;
      return;
  } else if(email.includes(' ')) {
      showError('Ошибка почты', 'E-mail не может содержать пробелы');
      isValid = false;
      return;
  } else if(!emailPattern.test(email)) {
      showError('Ошибка почты', 'Неккоректный E-mail');
      isValid = false;
      return;
  }

  if (!isValid) return;

  const formButton = document.querySelector('.form__button');
  const originalText = formButton.textContent;
  formButton.disabled = true;
  formButton.textContent = 'Отправка...';

  const templateParams = {
    name: name,
    email: email,
    phone: phone,
  };

  try {
    const response = await emailjs.send(
        'service_rlig7tg',
        'template_j2fdack',
        templateParams
    );

    form.reset();
  } catch (error) {
      console.error('Ошибка:', error);
  } finally {
        formButton.disabled = false;
        formButton.textContent = originalText;
    }
})

const showError = function(index, message) {
  const error = document.getElementById('error');

  error.classList.add('form__error--visible');
  error.textContent = `${index}: ${message}`;

  setTimeout(() => {
    error.classList.remove('form__error--visible');
  }, 3000);
}

const clearError = function() {
  const error = document.getElementById('error');

  error.classList.remove('form__error--visible');
  error.textContent = '';
}