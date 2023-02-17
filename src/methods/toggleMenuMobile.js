if (window.innerWidth < 768) {
  const headerButtonToggle = document.querySelector('.rovo-header-mobile__btn');
  const navMobile = document.querySelector('.rovo-header-anchor__nav-wrapper');
  const anchorItems = document.querySelectorAll('.rovo-header-anchor__item');

  headerButtonToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');

  })

  anchorItems.forEach((el) => {
    el.addEventListener('click', () => {
      navMobile.classList.remove('open');
      document.body.classList.toggle('overflow-hidden');
    })
  })
}