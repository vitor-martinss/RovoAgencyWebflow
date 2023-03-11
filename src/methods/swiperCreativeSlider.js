if (document.getElementById("rovo-slider-numbers")) {
  const swiper = new Swiper("#rovo-slider-numbers", {
    grabCursor: true,
    simulateTouch: true,
    effect: "creative",
    snapOnRelease: true,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    watchSlidesProgress: true,
    shortSwipes: true,
    loop: true,
    draggable: true,
    pagination: {
      el: document.querySelector(".rovo-slider-numbers .swiper-pagination"),
      clickable: false
    },
    creativeEffect: {
      limitProgress: 1,
      prev: {
        shadow: false,
        translate: ["0%", 0, -0.5]
      },
      next: {
        translate: ["100%", 0, 0]
      }
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        allowSlidePrev: false,
        spaceBetween: 32,
        creativeEffect: {
          limitProgress: 1,
          prev: {
            shadow: false,
            translate: ["0%", 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0]
          }
        }
      },
      992: {
        slidesPerView: 1.8,
        spaceBetween: 32,
        slideToClickedSlide: true,
        draggable: false,
        simulateTouch: false,
        creativeEffect: {
          limitProgress: 1,
          prev: {
            shadow: false,
            translate: ["0%", 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0]
          }
        }
      },
      1280: {
        slidesPerView: 2.5,
        spaceBetween: 32,
        slideToClickedSlide: true,
        draggable: false,
        creativeEffect: {
          limitProgress: 2.5,
          prev: {
            shadow: false,
            translate: ["0%", 0, -0.5]
          },
          next: {
            translate: ["105%", 0, 0]
          }
        }
      }
    }
  });
}
