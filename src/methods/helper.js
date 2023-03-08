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
setTargetOnPrivacyPolicyLinkToSelf();
