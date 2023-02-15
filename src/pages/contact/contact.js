const btnOpenModal = document.querySelectorAll('.rovo-modal-open_btn')
const btnCloseModal = document.querySelectorAll('.rovo-list-modal__item-close')
const overlayCloseModal = document.querySelectorAll('.rovo-list-modal--overlay')

const handleOpenModal = (element) => {
  element.forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.classList.add('modal-open');
      document.body.classList.add('overflow-hidden');
      document.querySelector('html').classList.add('overflow-hidden');

    })
  })
}

const handleCloseModal = (element) => {
  element.forEach((el) => {
    el.addEventListener('click', () => {
      el.closest('.modal-open').classList.remove('modal-open');
      document.body.classList.remove('overflow-hidden');
      document.querySelector('html').classList.remove('overflow-hidden');
    })
  })
}

handleOpenModal(btnOpenModal)
handleCloseModal(btnCloseModal)
handleCloseModal(overlayCloseModal)

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