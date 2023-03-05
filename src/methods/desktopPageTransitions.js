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

function handleLeaveAboutOrContactPage(currentContainer) {
  const main = currentContainer.querySelector("main");

  // courtine white container going up
  const animatedDiv = document.createElement("div");
  animatedDiv.classList.add("rovo-main__animation");
  main.appendChild(animatedDiv);

  gsap.to(animatedDiv, {
    duration: 0.3,
    transform: "translateY(0)"
  });

  // fade out rovo-header-anchor__nav-wrapper
  const navWrapper = currentContainer.querySelector(
    ".rovo-header-anchor__list"
  );

  gsap.to(navWrapper, {
    duration: 0.2,
    opacity: 0
  });
}

function handleEnterAboutOrContactPage(currentContainer) {
  // fade out rovo-header-anchor__nav-wrapper
  const navWrapper = currentContainer.querySelector(
    ".rovo-header-anchor__list"
  );

  gsap.to(navWrapper, {
    opacity: 1,
    duration: 0.5
  });

  gsap.to(currentContainer, {
    opacity: 1,
    duration: 0.1
  });
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
    "https://unpkg.com/aos@2.3.1/dist/aos.js",
    "https://cdn.jsdelivr.net/npm/@barba/core",
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
  window.scrollTo(0, 0);
  resetWebflow(next);
  AOS.init();
});

function handleDesktopPageTransitions() {
  if (window.innerWidth >= 768) {
    barba.init({
      transitions: [
        {
          name: "curtain-transition",
          // to: ["contact", "about"],
          async leave({ current }) {
            const done = this.async();
            //call page transition function
            handleLeaveAboutOrContactPage(current.container);
            //give a small delayTransition
            await delayTransition(300);
            done();
          },
          async enter({ next }) {
            const done = this.async();
            //call page transition function
            handleEnterAboutOrContactPage(next.container);
            //give a small delayTransition
            resetWebflow(next);
            await delayTransition(500);
            done();
          }
        }
      ]
    });
  }
}

handleDesktopPageTransitions();

window.addEventListener("resize", () => {
  handleDesktopPageTransitions();
});
