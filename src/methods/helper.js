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
function removeExtraElementsOnMobileHomepage() {
  if (window.innerWidth < 768) {
    return null;
  }

  document.querySelector("#rovo-home-about") &&
    document.querySelector("#rovo-home-about").remove();
  document.querySelector("#rovo-home-contact") &&
    document.querySelector("#rovo-home-contact").remove();
}

ScrollTrigger.refresh();

removeExtraElementsOnMobileHomepage();
setTargetOnPrivacyPolicyLinkToSelf();
gsap.registerPlugin(ScrollToPlugin);
