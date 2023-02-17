if (document.getElementById('rovo-slider-numbers')) {
  const swiper = new Swiper("#rovo-slider-numbers", {
    grabCursor: true,
    simulateTouch: true,
    effect: "creative",
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    watchSlidesProgress: true,
    shortSwipes: false,
    loop: true,
    pagination: {
      el: document.querySelector('.rovo-slider-numbers .swiper-pagination'),
      clickable: true,
    },

    creativeEffect: {
      limitProgress: 1,
      prev: {
        shadow: false,
        translate: [0, 0, -0.5]
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 32,
        creativeEffect: {
          limitProgress: 2,
          prev: {
            shadow: false,
            translate: [0, 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0],
          },
        }
      },
      1024: {
        slidesPerView: 1.8,
        spaceBetween: 32,
        slideToClickedSlide: true,
        creativeEffect: {
          limitProgress: 2,
          prev: {
            shadow: false,
            translate: [0, 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0],
          },
        }
      },
      1280: {
        slidesPerView: 2.5,
        spaceBetween: 32,
        slideToClickedSlide: true,
        creativeEffect: {
          limitProgress: 2.5,
          prev: {
            shadow: false,
            translate: [0, 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0],
          }
        }
      }
    }
  })
}


if (document.getElementById('rovo-slider-cards')) {
  const swiper = new Swiper("#rovo-slider-cards", {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    watchSlidesProgress: true,
    loop: true,
    pagination: {
      el: document.querySelector('.rovo-slider-cards .swiper-pagination'),
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 1.5,
        spaceBetween: 32,
        slideToClickedSlide: true
      }
    }
  })
}

if (window.innerWidth >= 768) {
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop < (window.innerHeight + 60)) {
      header.style.height = `calc(100vh - ${window.innerHeight - footerTop}px - 60px)`;
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

const btnOpenModal = document.querySelectorAll('.rovo-list__item-content')
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
      el.closest('.rovo-list__item.modal-open').classList.remove('modal-open');
      document.body.classList.remove('overflow-hidden');
      document.querySelector('html').classList.remove('overflow-hidden');
    })
  })
}

handleOpenModal(btnOpenModal)
handleCloseModal(btnCloseModal)
handleCloseModal(overlayCloseModal)