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

  function gsapScrollTriggerFadeUp() {
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
    }

    if (window.innerWidth >= 768) {
      curtainGSAPAnimation(currentContainer);
    } else {
      fadeOutGSAPAnimation(currentContainer);
    }
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
    navAnchorRoutes.setAttribute("data-gsap", "");
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

  function handleAfterTransitionToHomePage() {
    // remove fake logo of transition
    setTimeout(() => {
      document
        .querySelectorAll(".rovo-header-mobile__btn--clone-reel")
        .forEach((el) => el.remove());
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
    document.body.classList.add("overflow-hidden");
    document.querySelector("html").classList.add("overflow-hidden");
  });

  barba.hooks.after(({ next }) => {
    document.body.classList.remove("overflow-hidden");
    document.querySelector("html").classList.remove("overflow-hidden");

    const customLinks = [
      "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollToPlugin.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/Draggable.min.js",
      "https://cdn.jsdelivr.net/npm/@barba/core",
      "https://cdn.jsdelivr.net/npm/@barba/router@2.1.10/dist/barba-router.umd.min.js",
      "https://jz2oq8.csb.app/src/methods/helper.js",
      "https://jz2oq8.csb.app/src/methods/scrollTriggerAnimation.js",
      "https://jz2oq8.csb.app/src/methods/homeInitialAnimation.js",
      "https://jz2oq8.csb.app/src/methods/gsapReelSlider.js",
      "https://jz2oq8.csb.app/src/methods/asideHeaderHeightOnScroll.js",
      "https://jz2oq8.csb.app/src/methods/anchorScrollTo.js",
      "https://jz2oq8.csb.app/src/methods/toggleMenuMobile.js",
      "https://jz2oq8.csb.app/src/methods/toggleModal.js",
      "https://jz2oq8.csb.app/src/methods/submitNewsletterForm.js",
      "https://jz2oq8.csb.app/src/methods/submitContactForm.js",
      "https://jz2oq8.csb.app/src/methods/swiperCreativeSlider.js",
      "https://jz2oq8.csb.app/src/methods/swiperDefaultSlider.js"
    ];
    customLinks.map((el) => applyNewScript(el));
    gsapFadeInAnimation();
    gsapScrollTriggerFadeUp();
    window.scrollTo(0, 0);
    resetWebflow(next);
  });

  const defaultCurtainTransition = {
    name: "default-curtain-transition",
    sync: true,
    from: {
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
    }
  };

  const homeCurtainTransition = {
    name: "home-curtain-transition",
    sync: true,
    from: {
      route: ["home"]
    },
    to: {
      route: ["about", "contact", "privacy-policy"]
    },
    async leave({ current }) {
      const done = this.async();
      //call page transition function
      handleLeaveTransition(current.container, "home");
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async enter({ next }) {
      const done = this.async();
      //call page transition function
      handleEnterAboutOrContactPage(next.container, "home");
      //give a small delayTransition
      await delayTransition(300);
      done();
    },
    async after() {
      //call page transition function
      handleAfterTransitionFromHomePage();
    }
  };

  const toHomeTransition = {
    name: "enter-home-curtain-transition",
    from: {
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
      //call page transition function
      handleAfterTransitionToHomePage();
    }
  };

  barba.init({
    preventRunning: true,
    transitions: [
      defaultCurtainTransition,
      homeCurtainTransition,
      toHomeTransition
    ]
  });
}

window.addEventListener("load", () => {
  barbaJSPageTransitions();
});

window.addEventListener("resize", () => {
  barbaJSPageTransitions();
});
