if (window.innerWidth >= 768) {
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop < (window.innerHeight + 60)) {
      header.style.height = `calc(100vh - ${window.innerHeight - footerTop}px - 60px)`;
    } else {
      header.style.height = '100vh';
    }
  })
}