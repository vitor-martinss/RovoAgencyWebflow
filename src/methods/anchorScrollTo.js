function handleScrollToInsideApp() {
  if (!document.querySelectorAll(".rovo-js-anchor").length) {
    return;
  }

  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  const navMobile = document.querySelector(".rovo-header-anchor__nav-wrapper");

  const handleGSAPAnimation = (element, transformValue, duration) => {
    const timeLine = new TimelineMax({ paused: true });
    const animation = timeLine.to(element, {
      duration,
      transform: `${transformValue}`
    });

    animation.play();
  };

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
  function scrollToHash(hash, e) {
    const elem = hash ? document.querySelector(hash) : false;

    if (elem) {
      e && e.preventDefault();
      e && e.stopPropagation();
      history.pushState(null, null, hash);
      gsap.to(window, {
        duration: 0.5,
        ease: "none",
        scrollTo: {
          y: elem
        }
      });
    }
  }

  function handleCloseMenuAfterAnchorClicked() {
    if (window.innerWidth < 768) {
      navMobile.classList.remove("open");
      document.body.classList.toggle("overflow-hidden");
      handleGSAPAnimation(navMobile, "translateX(105%)", 0.3);
    }
  }

  // If a link's href is within the current page, scroll to it instead
  gsap.utils.toArray(".rovo-js-anchor").forEach((a) => {
    a.addEventListener("click", (e) => {
      scrollToHash(getSamePageAnchor(a), e);
      handleCloseMenuAfterAnchorClicked();
    });
  });

  // Scroll to the element in the URL's hash on load
  scrollToHash(window.location.hash);
}

handleScrollToInsideApp();
