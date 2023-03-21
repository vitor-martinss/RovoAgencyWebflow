function homeInitialAnimation() {
  const selectors = {
    homeReelContainer: document.querySelector(".rovo-js-reels"),
    homeAnimationContainer: document.querySelector(".rovo-home-animation"),
    homeHeader: ".rovo-reels-header",
    homeAnimationImage: ".rovo-home-animation__image",
    homeAnimationHeading: ".rovo-home-animation__heading",
    homeAnimatedContainer: ".rovo-home-animation"
  };

  if (!selectors.homeAnimationContainer) {
    return null;
  }

  function onStartAnimation() {
    selectors.homeAnimationContainer.classList.add(
      "rovo-home-animation--active"
    );
  }

  function onCompleteAnimation() {
    selectors.homeAnimationContainer.classList.remove(
      "rovo-home-animation--active"
    );
  }

  function homeAnimation() {
    gsap.set(selectors.homeHeader, {
      opacity: 0
    });

    const tl = gsap.timeline({
      onStart: () => onStartAnimation(),
      onComplete: () => onCompleteAnimation()
    });
    tl.to(selectors.homeAnimationImage, {
      y: 0,
      delay: 0.5,
      duration: 0.3
    });
    tl.to(selectors.homeAnimationImage, {
      y: -250,
      delay: 1,
      duration: 0.3
    });
    tl.to(
      selectors.homeAnimationHeading,
      {
        y: 0,
        duration: 0.3
      },
      ">-0.4"
    );
    tl.to(selectors.homeAnimationHeading, {
      y: -250,
      delay: 1,
      duration: 0.3
    });
    tl.to(
      selectors.homeAnimatedContainer,
      {
        height: 0,
        duration: 0.3
      },
      "<"
    );
    tl.to(selectors.homeHeader, {
      opacity: 1,
      duration: 0.2
    });
    tl.to(selectors.homeAnimationContainer, {
      display: "none"
    });
  }

  function setSessionStorage() {
    sessionStorage.setItem("homeAnimation", "true");
  }

  if (sessionStorage.getItem("homeAnimation") !== "true") {
    homeAnimation();
    setSessionStorage();
  } else {
    selectors.homeAnimationContainer &&
      selectors.homeAnimationContainer.remove();
  }
}

homeInitialAnimation();
