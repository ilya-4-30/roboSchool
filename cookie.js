document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.cookie');
  const acceptButton = document.querySelector('.cookie__accept');

  const userConsent = Cookies.get('user_cookie_consent');

  if(!userConsent) {
    setTimeout(() => {
      banner.classList.remove('hidden');
    }, 2000)
  }

  acceptButton.addEventListener('click', () => {
    Cookies.set('user_cookie_consent', 'accepted', { expires: 7, path: '' });

    localStorage.setItem('cookie_accepted_at', new Date().toISOString());

    banner.classList.add('hidden');
  })
})