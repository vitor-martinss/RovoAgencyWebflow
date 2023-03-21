function handleScrollToInsideApp() {
  if (!document.querySelectorAll(".rovo-js-anchor").length) {
    return;
  }

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  // Detect if a link's href goes to the current page
  function getSamePageAnchor(link) {
    if (
      link.protocol !== window.location.protocol ||
      link.host !== window.location.host ||
      link.pathname !== window.location.pathname ||
      link.search !== window.location.search
    ) {
      return false;
    }

    return link.hash;
  }

  // Scroll to a given hash, preventing the event given if there is one
  function scrollToHash(hash, offset = 0) {
    const elem = hash ? document.querySelector(hash) : false;
    if (elem) {
      gsap.to(window, {
        duration: 0.5,
        ease: "none",
        scrollTo: {
          y: elem,
          offsetY: offset
        }
      });
    }
  }

  // If a link's href is within the current page, scroll to it instead
  gsap.utils.toArray(".rovo-js-anchor").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.innerWidth < 768) {
        scrollToHash(getSamePageAnchor(a), 70);
      } else {
        scrollToHash(getSamePageAnchor(a), 29);
      }
    });
  });

  // Scroll to the element in the URL's hash on load
  scrollToHash(window.location.hash);
}

handleScrollToInsideApp();
