function scrollPinHomeAnimation() {
  ScrollTrigger.normalizeScroll(true); // enable
  gsap.to(window, {
    duration: 0,
    scrollTo: {
      y: 0,
      offsetY: 0
    }
  });
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".rovo-js-gsap-pin").forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top", 
      pin: true, 
      pinSpacing: false 
    });
  });
  
  
  ScrollTrigger.create({
    snap: 1 / 4 // snap whole page to the closest section!
  });
  
}

window.innerWidth < 768 && scrollPinHomeAnimation();

// rovo-home

// rovo-home-about
// rovo-header-mobile-about

// rovo-home-contact
// rovo-header-mobile-contact
