function onStartAnimation() {
  document
    .querySelector(".rovo-home-animation")
    .classList.add("rovo-home-animation--active");
}

function onCompleteAnimation() {
  document
    .querySelector(".rovo-home-animation")
    .classList.remove("rovo-home-animation--active");
}

function homeAnimation() {
  gsap.set(".rovo-reels-header", {
    opacity: 0
  });

  const tl = gsap.timeline({
    onStart: onStartAnimation(),
    onComplete: onCompleteAnimation()
  });
  tl.to(".rovo-home-animation__image", {
    y: 0,
    delay: 0.5,
    duration: 0.3
  });
  tl.to(".rovo-home-animation__image", {
    y: -250,
    delay: 1,
    duration: 0.3
  });
  tl.to(
    ".rovo-home-animation__heading",
    {
      y: 0,
      duration: 0.3
    },
    ">-0.4"
  );
  tl.to(".rovo-home-animation__heading", {
    y: -250,
    delay: 1,
    duration: 0.3
  });
  tl.to(
    ".rovo-home-animation",
    {
      height: 0,
      duration: 0.3
    },
    "<"
  );
  tl.to(".rovo-reels-header", {
    opacity: 1,
    duration: 0.2
  });
}

function setSessionStorage() {
  sessionStorage.setItem("homeAnimation", "true");
}

window.addEventListener("load", () => {
  if (sessionStorage.getItem("homeAnimation") !== "true") {
    homeAnimation();
    setSessionStorage();
  } else {
    document.querySelector(".rovo-home-animation").remove();
  }
});
