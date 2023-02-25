window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    const headerButtonToggle = document.querySelector(
      ".rovo-header-mobile__btn"
    );
    const navMobile = document.querySelector(
      ".rovo-header-anchor__nav-wrapper"
    );
    const anchorItems = document.querySelectorAll(".rovo-js-nav-anchor");
    const pageRouterLink = document.querySelectorAll(".rovo-js-nav-page");
    const homePageHeader = document.querySelector(".rovo-reels-header");

    const handleGSAPAnimation = (element, transformValue, duration) => {
      const timeLine = new TimelineMax({ paused: true });
      const animation = timeLine.to(element, {
        duration,
        transform: `${transformValue}`
      });

      animation.play();
    };

    headerButtonToggle.addEventListener("click", () => {
      navMobile.classList.toggle("open");
      homePageHeader && homePageHeader.classList.toggle("header--open");
      document.body.classList.toggle("overflow-hidden");
      const isNavMobileOpen = navMobile.classList.contains("open");

      if (isNavMobileOpen) {
        handleGSAPAnimation(navMobile, "translateX(0%)", 0.3);
      }

      if (
        !isNavMobileOpen &&
        navMobile.style.transform === "translate(0px, 0px)"
      ) {
        handleGSAPAnimation(navMobile, "translateX(105%)", 0.3);
      }
    });

    anchorItems.forEach((el) => {
      el.addEventListener("click", () => {
        navMobile.classList.remove("open");
        homePageHeader && homePageHeader.classList.remove("header--open");
        document.body.classList.toggle("overflow-hidden");

        handleGSAPAnimation(navMobile, "translateX(105%)", 0.3);
      });
    });

    pageRouterLink.forEach((el) => {
      el.addEventListener("click", () => {
        navMobile.classList.remove("open");
        homePageHeader && homePageHeader.classList.remove("header--open");
        document.body.classList.toggle("overflow-hidden");

        handleGSAPAnimation(navMobile, "translateX(105%)", 0);
      });
    });
  }
});
