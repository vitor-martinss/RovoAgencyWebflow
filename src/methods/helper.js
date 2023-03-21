// in order to privacy policy link on footer work with page transitions
function setTargetOnPrivacyPolicyLinkToSelf() {
  const privacyPolicyLink = document.querySelectorAll(
    "a.rovo-social-link__text"
  );
  privacyPolicyLink.forEach((link) => {
    if (link.href.includes("privacy-policy")) {
      link.parentElement.classList.add("rovo-js-nav-page");
      link.setAttribute("target", "_self");
    }
  });
}

// this is because page transitions and pages that are on homepage mobile version scroll up
// function removeExtraElementsOnMobileHomepage() {
//   if (window.innerWidth < 768) {
//     return null;
//   }

//   document.querySelector("#rovo-home-about") &&
//     document.querySelector("#rovo-home-about").remove();
//   document.querySelector("#rovo-home-contact") &&
//     document.querySelector("#rovo-home-contact").remove();
// }

//removeExtraElementsOnMobileHomepage();
setTargetOnPrivacyPolicyLinkToSelf();

function stopOverscroll(element) {
  element = gsap.utils.toArray(element)[0] || window;
  (element === document.body || element === document.documentElement) &&
    (element = window);
  let lastScroll = 0,
    lastTouch,
    forcing,
    forward = true,
    isRoot = element === window,
    scroller = isRoot ? document.scrollingElement : element,
    ua = window.navigator.userAgent + "",
    getMax = isRoot
      ? () => scroller.scrollHeight - window.innerHeight
      : () => scroller.scrollHeight - scroller.clientHeight,
    addListener = (type, func) =>
      element.addEventListener(type, func, { passive: false }),
    revert = () => {
      scroller.style.overflowY = "auto";
      forcing = false;
    },
    kill = () => {
      forcing = true;
      scroller.style.overflowY = "hidden";
      !forward && scroller.scrollTop < 1
        ? (scroller.scrollTop = 1)
        : (scroller.scrollTop = getMax() - 1);
      setTimeout(revert, 1);
    },
    handleTouch = (e) => {
      let evt = e.changedTouches ? e.changedTouches[0] : e,
        forward = evt.pageY <= lastTouch;
      if (
        ((!forward && scroller.scrollTop <= 1) ||
          (forward && scroller.scrollTop >= getMax() - 1)) &&
        e.type === "touchmove"
      ) {
        e.preventDefault();
      } else {
        lastTouch = evt.pageY;
      }
    },
    handleScroll = (e) => {
      if (!forcing) {
        let scrollTop = scroller.scrollTop;
        forward = scrollTop > lastScroll;
        if (
          (!forward && scrollTop < 1) ||
          (forward && scrollTop >= getMax() - 1)
        ) {
          e.preventDefault();
          kill();
        }
        lastScroll = scrollTop;
      }
    };
  if ("ontouchend" in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
    addListener("scroll", handleScroll);
    addListener("touchstart", handleTouch);
    addListener("touchmove", handleTouch);
  }
  scroller.style.overscrollBehavior = "none";
}

stopOverscroll();
