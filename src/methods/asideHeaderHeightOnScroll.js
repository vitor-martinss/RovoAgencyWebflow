function handleAsideHeaderHeightOnScroll() {
  if (!document.querySelector("footer")) {
    return null;
  }

  if (window.innerWidth >= 768) {
    const footerTop = document.querySelector("footer").getBoundingClientRect()
      .top;

    if (footerTop < window.innerHeight + 60) {
      document.querySelector("header").style.height = `calc(100vh - ${
        window.innerHeight - footerTop
      }px - 60px)`;
    } else {
      document.querySelector("header").style.height = "100vh";
    }
  }
}

if (window.innerWidth >= 768) {
  window.addEventListener("scroll", () => {
    handleAsideHeaderHeightOnScroll();
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    handleAsideHeaderHeightOnScroll();
  } else {
    document.querySelector("header").style.height = "4.375rem";
  }
});
