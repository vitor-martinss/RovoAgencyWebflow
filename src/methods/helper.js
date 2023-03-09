function setTargetOnPrivacyPolicyLinkToSelf() {
  const privacyPolicyLink = document.querySelectorAll(
    "a.rovo-social-link__text"
  );
  privacyPolicyLink.forEach((link) => {
    if (link.href !== '#' && link.href.includes("privacy-policy")) {
      link.parentElement.classList.add("rovo-js-nav-page");
      link.setAttribute("target", "_self");
    }
  });
}

function removeExtraElementsOnMobileHomepage() {
  if (window.innerWidth < 768) {
    return null
  }

  document.querySelector('#rovo-home-about') &&  document.querySelector('#rovo-home-about').remove()
  document.querySelector('#rovo-home-contact') && document.querySelector('#rovo-home-contact').remove()
}
removeExtraElementsOnMobileHomepage()
setTargetOnPrivacyPolicyLinkToSelf();
