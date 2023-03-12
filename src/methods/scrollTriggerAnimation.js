function scrollTriggerAnimation() {
  ScrollTrigger.normalizeScroll(true); // enable
  const fadeUpContainer = gsap.utils.toArray('[data-gsap="fade-up"]');

  fadeUpContainer.forEach((fadeUp, i) => {
    const animationFadeUp = gsap.fromTo(
      fadeUp,
      {
        autoAlpha: 0,
        y: 50
      },
      {
        duration: 0.5,
        autoAlpha: 1,
        y: 0
      }
    );
    ScrollTrigger.create({
      trigger: fadeUp,
      start: "10% 80%",
      animation: animationFadeUp,
      toggleActions: "play none none none",
      once: true
    });
  });

  const fadeInContainer = gsap.utils.toArray('[data-gsap="fade-in"]');

  fadeInContainer.forEach((fadeIn, i) => {
    let delayedFadeInAnimation = 0;
    if (fadeIn.hasAttribute("data-gsap-delay")) {
      delayedFadeInAnimation =
        Number(fadeIn.getAttribute("data-gsap-delay")) / 1000;
    }

    const animationFadeIn = gsap.fromTo(
      fadeIn,
      {
        autoAlpha: 0
      },
      {
        duration: 0.5,
        autoAlpha: 1,
        delay: delayedFadeInAnimation
      }
    );
    ScrollTrigger.create({
      trigger: fadeIn,
      start: "10% 80%",
      animation: animationFadeIn,
      toggleActions: "play none none none",
      once: true
    });
  });

  const staticFadeInAnimation = gsap.utils.toArray(
    '[data-static-gsap="fade-in"]'
  );
  staticFadeInAnimation.forEach((staticFadeIn, i) => {
    let delayedAnimation = 0;
    if (staticFadeIn.hasAttribute("data-gsap-delay")) {
      delayedAnimation =
        Number(staticFadeIn.getAttribute("data-gsap-delay")) / 1000;
    }

    gsap.fromTo(
      staticFadeIn,
      {
        autoAlpha: 0
      },
      {
        duration: 0.5,
        autoAlpha: 1,
        delay: delayedAnimation
      }
    );
  });
}

//important to leave this inside a load listener because of page transitions
window.addEventListener("load", () => {
  scrollTriggerAnimation();
});
