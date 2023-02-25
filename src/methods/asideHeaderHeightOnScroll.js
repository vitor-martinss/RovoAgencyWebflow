const footer = document.querySelector("footer");
const header = document.querySelector("header");

function handleAsideHeaderHeightOnScroll() {
  if (window.innerWidth >= 768) {
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop < window.innerHeight + 60) {
      header.style.height = `calc(100vh - ${
        window.innerHeight - footerTop
      }px - 60px)`;
    } else {
      header.style.height = "100vh";
    }
  }
}

window.addEventListener("scroll", () => {
  handleAsideHeaderHeightOnScroll();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    handleAsideHeaderHeightOnScroll();
  } else {
    header.style.height = "4.375rem";
  }
});
