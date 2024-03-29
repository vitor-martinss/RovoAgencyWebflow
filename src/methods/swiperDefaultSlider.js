if (document.getElementById("rovo-slider-cards")) {
  new Swiper("#rovo-slider-cards", {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 1,
    spaceBetween: 0,
    snapOnRelease: true,
    centeredSlides: false,
    watchSlidesProgress: true,
    shortSwipes: true,
    loop: false,
    pagination: {
      el: document.querySelector(".rovo-slider-cards .swiper-pagination"),
      clickable: true
    },

    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 32
      },
      1024: {
        slidesPerView: 1.5,
        spaceBetween: 32,
        slideToClickedSlide: true
      }
    },
    on: {
      reachEnd: (index) => {
        if (window.innerWidth >= 768) {
          index.slides[2].querySelector(
            ".rovo-slider-cards__container"
          ).style.paddingRight = "30px";
        }
      }
    }
  });
}

if (document.getElementById("rovo-slider-selected-clients")) {
  new Swiper("#rovo-slider-selected-clients", {
    simulateTouch: true,
    slidesPerView: 1,
    spaceBetween: 0,
    snapOnRelease: true,
    centeredSlides: false,
    watchSlidesProgress: true,
    shortSwipes: true,
    loop: true,
    pagination: {
      el: document.querySelector(".rovo-clients-swiper .swiper-pagination"),
      clickable: true
    }
  });
}
