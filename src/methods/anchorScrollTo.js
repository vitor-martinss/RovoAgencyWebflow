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
function scrollToHash(hash, e, offset = 0) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: elem,
        offsetY: offset
      }
    });
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      scrollToHash(getSamePageAnchor(a), e, 70);
    } else {
      scrollToHash(getSamePageAnchor(a), e, 0);
    }
  });
});

gsap.registerPlugin(ScrollToPlugin);
// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);
