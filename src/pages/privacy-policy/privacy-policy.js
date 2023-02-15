if (window.innerWidth >= 768) {
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop < window.innerHeight) {
      header.style.height = `calc(100vh - ${window.innerHeight - footerTop}px)`;
    } else {
      header.style.height = '100vh';
    }
  })
}

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