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