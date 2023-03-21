function barbaJSPageTransitions() {
  const myRoutes = [
    {
      path: "/",
      name: "home"
    },
    {
      path: "/contact",
      name: "contact"
    },
    {
      path: "/about",
      name: "about"
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy"
    }
  ];

  // tell Barba to use the router with your routes
  barba.use(barbaRouter, {
    routes: myRoutes
  });

  function resetWebflow(next) {
    window.Webflow.push(function () {
      let parser = new DOMParser();
      let dom = parser.parseFromString(next.html, "text/html");
      let webflowPageId = $(dom).find("html").attr("data-wf-page");
      $("html").attr("data-wf-page", webflowPageId);
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
    });
  }

  let scrollFired = false;

  // function that prevents transition page with home animation - desktop and mobile
  function handleFireScrollUpAfterFirstAnimation() {
    const isAnimationHappenning =
      document.querySelector(".rovo-home-animation") &&
      document
        .querySelector(".rovo-home-animation")
        .classList.contains("rovo-home-animation--active");
    if (isAnimationHappenning) {
      scrollFired = true;
      setTimeout(() => {
        scrollFired = false;
      }, 3300);
    }
  }

  function handleFireScrollUpPageTransition() {
    if (!document.querySelector(".rovo-js-reels") || scrollFired === true) {
      return;
    }

    handleFireScrollUpAfterFirstAnimation();
    gsap.registerPlugin(Observer);

    Observer.create({
      trigger: ".rovo-reels",
      type: "wheel, scroll",
      dragMinimum: 500,
      tolerance: 30,
      ignore: ".rovo-home-animation--active",
      onDown: () => {
        if (
          !scrollFired &&
          document.querySelector("[data-route='scroll-up']")
        ) {
          document.querySelector("[data-route='scroll-up']").click();
          scrollFired = true;
        }
      }
    });
  }

  // function handleFireScrollDownPageTransition() {
  //   if (!document.querySelector("#rovo-wrapper-about-page")) {
  //     return;
  //   }

  //   gsap.registerPlugin(Observer);

  //   Observer.create({
  //     trigger: "#rovo-wrapper-about-page",
  //     type: "wheel, scroll, touch",
  //     //tolerance: 30,
  //     onUp: (self) => {
  //       console.log(self.event.movementY);
  //       console.log();
  //       console.log(self.event.screenY);
  //       console.log(self.event.y);
  //       if (self.scrollY() === 0 && self.isDragging) {
  //         alert("change", self.event.movementY);
  //       }
  //     }

  //     // onDown: () => {
  //     //   if (
  //     //     !scrollFired &&
  //     //     document.querySelector("[data-route='scroll-up']")
  //     //   ) {
  //     //     document.querySelector("[data-route='scroll-up']").click();
  //     //     scrollFired = true;
  //     //   }
  //     // }
  //   });
  // }

  function delayTransition(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  function curtainGSAPAnimation(currentContainer) {
    const main = currentContainer.querySelector("main");

    // courtine white container going up
    const animatedDiv = document.createElement("div");
    animatedDiv.classList.add("rovo-main__animation");
    main.appendChild(animatedDiv);

    gsap.to(animatedDiv, {
      duration: 0.3,
      transform: "translateY(-3%)"
    });
  }

  function gsapFadeInAnimation() {
    gsap.utils
      .toArray('[data-static-gsap="fade-in"]')
      .forEach((staticFadeIn, i) => {
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

  function gsapScrollTriggerFadeUp() {
    gsap.utils.toArray('[data-gsap="fade-up"]').forEach((fadeUp, i) => {
      const animationFadeUp = gsap.fromTo(
        fadeUp,
        {
          autoAlpha: 0
        },
        {
          duration: 0.5,
          autoAlpha: 1
        }
      );
      ScrollTrigger.create({
        trigger: fadeUp,
        animation: animationFadeUp,
        toggleActions: "play none none none",
        once: true
      });
    });
  }

  function fadeOutGSAPAnimation(currentContainer) {
    const main = currentContainer.querySelector("main");
    gsap.to(main, {
      duration: 0.3,
      opacity: 0
    });
  }

  function handleLeaveTransition(currentContainer, fromRoute) {
    if (fromRoute === "home") {
      // because of the line below we need sync as true
      document.querySelector(".rovo-header-anchor").style.background =
        "transparent";
      //keep the logo on screen
      const headerBrandImage = document.querySelector(
        ".rovo-header-brand__image"
      );
      document
        .querySelectorAll(".rovo-header-brand__image--clone-reel")
        .forEach((el) => el.remove());
      document
        .querySelectorAll(".rovo-header-mobile__btn--clone-reel")
        .forEach((el) => el.remove());
      headerBrandImage.style.opacity = 1;
      const headerDesktopNav = currentContainer.querySelector(
        ".rovo-reels-header__nav"
      );
      headerDesktopNav.remove();
    } else {
      const navWrapper = currentContainer.querySelector(
        ".rovo-header-anchor__list"
      );

      gsap.set(navWrapper, {
        opacity: 0
      });
    }

    if (window.innerWidth >= 768) {
      curtainGSAPAnimation(currentContainer);
    } else {
      fadeOutGSAPAnimation(currentContainer);
    }
  }

  function handleScrollUpLeaveTransition(currentContainer, nextContainer) {
    const tl = gsap.timeline();
    tl.to(currentContainer, {
      opacity: 0.5,
      duration: 0.3
    });

    nextContainer
      .querySelector(".rovo-js-barba-slide-up")
      .classList.add("rovo-js-barba-slide-up--animate");
    nextContainer.querySelector(".rovo-header-anchor").style.opacity = 0;
  }

  function handleScrollUpEnterNextPage(nextContainer) {
    // remove fade in animations from other page transitions
    document
      .querySelectorAll('[data-static-gsap="fade-in"]')
      .forEach((el) => el.setAttribute("data-static-gsap", ""));

    nextContainer.querySelector(".rovo-header-anchor").style.opacity = 0;

    gsap.to(nextContainer.querySelector(".rovo-js-barba-slide-up--animate"), {
      duration: 0.6,
      top: 0
    });

    gsap.to(nextContainer.querySelector(".rovo-header-anchor"), {
      opacity: 1,
      duration: 0.3
    });
  }

  function handleScrollUpAfterTransition() {
    document
      .querySelector(".rovo-js-barba-slide-up")
      .classList.remove("rovo-js-barba-slide-up--animate");

    document.querySelector(".rovo-js-barba-slide-up").style = "";

    // remove fake menu button of transition
    document
      .querySelectorAll(".rovo-header-mobile__btn--clone-reel")
      .forEach((el) => el.remove());
    // remove fake logo after transition
    document
      .querySelectorAll(".rovo-header-brand__image--clone-reel")
      .forEach((el) => el.remove());
    ScrollTrigger.refresh();
  }

  function handleEnterAboutOrContactPage(nextContainer, fromRoute) {
    if (fromRoute === "home") {
      //keep the logo on screen
      const headerBrandImage = nextContainer.querySelector(
        ".rovo-header-brand__image"
      );
      // clone the image and add it to the body
      const clonedHeaderBrandImage = headerBrandImage.cloneNode(true);
      headerBrandImage.style.opacity = 0;
      clonedHeaderBrandImage.classList.add(
        "rovo-header-brand__image--clone-reel"
      );
      document.body.appendChild(clonedHeaderBrandImage);
    }
    const navAnchorRoutes = nextContainer.querySelector(
      ".rovo-header-anchor__routes"
    );
    navAnchorRoutes.setAttribute("data-static-gsap", "");
    //fade out rovo-header-anchor__nav-wrapper
    const navWrapper = nextContainer.querySelector(".rovo-header-anchor__list");
    navWrapper.style.opacity = 0;
  }

  function handleAfterTransitionFromHomePage() {
    //keep the logo on screen
    const headerBrandImage = document.querySelector(
      ".rovo-header-brand__image"
    );
    // clone the image and add it to the body
    const clonedHeaderBrandImage = headerBrandImage.cloneNode(true);
    headerBrandImage.style.opacity = 0;
    clonedHeaderBrandImage.classList.add(
      "rovo-header-brand__image--clone-reel"
    );
    document.body.appendChild(clonedHeaderBrandImage);
    // remove fake logo of transition
    setTimeout(() => {
      document
        .querySelectorAll(".rovo-header-brand__image--clone-reel")
        .forEach((el) => el.remove());

      document
        .querySelectorAll(".rovo-header-mobile__btn--clone-reel")
        .forEach((el) => el.remove());
      headerBrandImage.style.opacity = 1;
      document.querySelector(".rovo-header-anchor").style.background = "white";
    }, 1000);
  }

  function handleEnterHomePage(nextContainer) {
    // fade in the header
    const reelHeaderNav = nextContainer.querySelector(
      ".rovo-reels-header__nav"
    );
    reelHeaderNav.setAttribute("data-gsap", "fade-in");

    if (sessionStorage.getItem("homeAnimation") === "true") {
      //keep the logo on screen
      const headerBrandImage = nextContainer.querySelector(
        ".rovo-header-brand__image"
      );
      // clone the image and add it to the body
      const clonedHeaderBrandImage = headerBrandImage.cloneNode(true);
      headerBrandImage.style.opacity = 0;
      clonedHeaderBrandImage.classList.add(
        "rovo-header-brand__image--clone-reel"
      );
      document.body.appendChild(clonedHeaderBrandImage);

      if (window.innerWidth < 768) {
        const mobileMenuBtn = document.querySelector(
          ".rovo-header-mobile__btn"
        );
        const clonedMenuBtn = mobileMenuBtn.cloneNode(true);
        clonedMenuBtn.classList.add("rovo-header-mobile__btn--clone-reel");
        document.body.appendChild(clonedMenuBtn);
      }
    }
  }

  function applyNewScript(src) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      existingScript.remove();
    }
    const newScript = document.createElement("script");
    newScript.src = src;
    document.body.append(newScript);
  }

  barba.hooks.before(() => {
    bodyScrollLock.clearBodyLocks();
    document.body.classList.add("overflow-hidden");
    document.querySelector("html").classList.add("overflow-hidden");
  });

  barba.hooks.after(({ next }) => {
    document.body.classList.remove("overflow-hidden");
    document.querySelector("html").classList.remove("overflow-hidden");

    const customLinks = [
      "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js",
      "https://cdn.jsdelivr.net/npm/tua-body-scroll-lock",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/Observer.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollToPlugin.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/Draggable.min.js",
      "https://cdn.jsdelivr.net/npm/@barba/core",
      "https://cdn.jsdelivr.net/npm/@barba/router@2.1.10/dist/barba-router.umd.min.js",
      "https://jz2oq8.csb.app/src/methods/helper.js",
      "https://jz2oq8.csb.app/src/methods/scrollTriggerAnimations.js",
      "https://jz2oq8.csb.app/src/methods/gsapReelSlider.js",
      "https://jz2oq8.csb.app/src/methods/asideHeaderHeightOnScroll.js",
      "https://jz2oq8.csb.app/src/methods/anchorScrollTo.js",
      "https://jz2oq8.csb.app/src/methods/toggleMenuMobile.js",
      "https://jz2oq8.csb.app/src/methods/toggleModal.js",
      "https://jz2oq8.csb.app/src/methods/submitNewsletterForm.js",
      "https://jz2oq8.csb.app/src/methods/submitContactForm.js",
      "https://jz2oq8.csb.app/src/methods/swiperCreativeSlider.js",
      "https://jz2oq8.csb.app/src/methods/swiperDefaultSlider.js",
      "https://jz2oq8.csb.app/src/methods/homeInitialAnimation.js"
    ];
    customLinks.map((el) => applyNewScript(el));

    // reset scroll to Top
    gsap.to(window, {
      duration: 0,
      scrollTo: {
        y: 0,
        offsetY: 0
      }
    });

    // remove fake logo of transition
    setTimeout(() => {
      document
        .querySelectorAll(".rovo-header-mobile__btn--clone-reel")
        .forEach((el) => el.remove());
    }, 1000);

    scrollFired = false;
    ScrollTrigger.refresh();
    bodyScrollLock.clearBodyLocks();
    resetWebflow(next);
  });

  const defaultCurtainTransition = {
    name: "default-curtain-transition",
    sync: true,
    from: {
      // define a custom rule based on the trigger class
      custom: ({ trigger }) => {
        return trigger.dataset && trigger.dataset.route !== "scroll-up";
      },
      route: ["contact", "about", "privacy-policy"]
    },
    to: {
      route: ["contact", "about", "privacy-policy"]
    },
    async leave({ current }) {
      const done = this.async();
      //call page transition function
      handleLeaveTransition(current.container, "default");
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleEnterAboutOrContactPage(next.container, "default");
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async after() {
      gsapFadeInAnimation();
      gsapScrollTriggerFadeUp();
    }
  };

  const homeCurtainTransition = {
    name: "home-curtain-transition",
    sync: true,
    from: {
      // define a custom rule based on the trigger
      custom: ({ trigger }) => {
        return trigger.dataset && trigger.dataset.route !== "scroll-up";
      },
      route: ["home"]
    },
    to: {
      // privacy policy is available on menu mobile version only
      route: ["about", "contact", "privacy-policy"]
    },

    async leave({ current }) {
      const done = this.async();
      //call page transition function
      handleLeaveTransition(current.container, "home");
      //give a small delayTransition
      await delayTransition(500);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleEnterAboutOrContactPage(next.container, "home");
      //give a small delayTransition
      await delayTransition(500);
      done();
    },
    async after() {
      //call page transition function
      handleAfterTransitionFromHomePage();

      gsapFadeInAnimation();
      gsapScrollTriggerFadeUp();
    }
  };

  const toHomeTransition = {
    name: "enter-home-curtain-transition",
    from: {
      // define a custom rule based on the trigger
      custom: ({ trigger }) => {
        return trigger.dataset && trigger.dataset.route !== "scroll-up";
      },
      route: ["contact", "about", "privacy-policy"]
    },
    to: {
      route: ["home"]
    },
    async leave({ current }) {
      const done = this.async();
      //call page transition function
      handleLeaveTransition(current.container, "default");
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleEnterHomePage(next.container);
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async after() {
      handleFireScrollUpPageTransition();
    }
  };

  const fromHomePageScrollUpView = {
    sync: true,
    name: "scroll-up-from-home-transition",
    from: {
      // define a custom rule based on the trigger class
      custom: ({ trigger }) => {
        return trigger.dataset && trigger.dataset.route === "scroll-up";
      },
      route: ["home"]
    },
    to: {
      route: ["about"]
    },

    async leave({ current, next }) {
      const done = this.async();
      //call page transition function
      handleScrollUpLeaveTransition(current.container, next.container);
      //give a small delayTransition
      await delayTransition(500);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleScrollUpEnterNextPage(next.container);
      //give a small delayTransition
      await delayTransition(800);
      done();
    },
    async after() {
      //call page transition function
      handleScrollUpAfterTransition();
    }
  };

  const fromAboutToHomePageScrollDownView = {
    sync: true,
    name: "scroll-down-from-about-transition",
    from: {
      // define a custom rule based on the trigger class
      custom: ({ trigger }) => {
        return trigger.dataset && trigger.dataset.route === "scroll-down";
      },
      route: ["about"]
    },
    to: {
      route: ["home"]
    },

    async leave({ current, next }) {
      const done = this.async();
      //call page transition function
      handleScrollUpLeaveTransition(current.container, next.container);
      //give a small delayTransition
      await delayTransition(500);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleScrollUpEnterNextPage(next.container);
      //give a small delayTransition
      await delayTransition(800);
      done();
    },
    async after() {
      //call page transition function
      handleScrollUpAfterTransition();
    }
  };

  barba.init({
    preventRunning: true,
    transitions: [
      fromHomePageScrollUpView,
      fromAboutToHomePageScrollDownView,
      defaultCurtainTransition,
      homeCurtainTransition,
      toHomeTransition
    ]
  });

  barba.prefetch("/");
  barba.prefetch("/about");
  //handleFireScrollDownPageTransition();
  // prevent user to scroll up and start transition page before the end of the animation
  handleFireScrollUpPageTransition();
}

window.addEventListener("load", () => {
  gsap.to(window, {
    duration: 0,
    scrollTo: {
      y: 0,
      offsetY: 0
    }
  });

  barbaJSPageTransitions();
});

window.addEventListener("resize", () => {
  barbaJSPageTransitions();
});
