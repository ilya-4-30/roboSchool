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
