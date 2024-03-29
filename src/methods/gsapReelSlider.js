function gsapReelSlider() {
  const selectors = {
    mainContainer: document.getElementById("rovo-reels-main"),
    thumbnailContainer: document.querySelector(".rovo-reels-thumbnail"),
    thumbnailFakeBackground: document.querySelector(
      ".rovo-reels-thumbnail-background"
    ),
    thumbnailItemToArrayDesktop: gsap.utils.toArray(
      ".rovo-reels__list-item-desktop"
    ),
    thumbnailItemToArrayMobile: gsap.utils.toArray(
      ".rovo-reels__list-item-mobile"
    )
  };

  let activeElement;

  if (!selectors.mainContainer) {
    return null;
  }

  function handleMouseMoveOnDesktop() {
    if (!document.querySelector(".rovo-reel-footer")) {
      return;
    }

    function fadeInMouseMove() {
      if (!document.querySelector(".rovo-reel-footer")) {
        return;
      }
      gsap.to(".rovo-reel-footer", {
        opacity: 1,
        duration: 0.3
      });
    }

    function fadeOutMouseMove() {
      if (!document.querySelector(".rovo-reel-footer")) {
        return;
      }
      gsap.to(".rovo-reel-footer", {
        opacity: 0,
        duration: 0.3,
        delay: 0.4
      });
    }

    let mouseMoveTimer;
    let isMouseDown = false;

    // Set up the mousemove event listener
    document.addEventListener("mousedown", () => {
      isMouseDown = true;
      fadeInMouseMove();
      clearTimeout(mouseMoveTimer);
      mouseMoveTimer = setTimeout(fadeInMouseMove, 0);
    });

    document.addEventListener("mouseup", () => {
      isMouseDown = false;
      clearTimeout(mouseMoveTimer);
      mouseMoveTimer = setTimeout(fadeOutMouseMove, 1000);
    });

    // Set up the mousemove event listener
    document.addEventListener("mousemove", () => {
      if (!isMouseDown) {
        fadeInMouseMove();
        clearTimeout(mouseMoveTimer);
        mouseMoveTimer = setTimeout(fadeOutMouseMove, 1000);
      }
    });
  }

  function handleFakeBackground() {
    const thumbnailContainerWidth = selectors.thumbnailContainer.offsetWidth;
    const sumOfPaddingRightAndLeftOfThumbnailContainer =
      window.innerWidth < 991 ? 50 : 60;
    selectors.thumbnailFakeBackground.style.width = `${
      thumbnailContainerWidth - sumOfPaddingRightAndLeftOfThumbnailContainer + 5
    }px`;
  }

  function handleSwitchAssetsOnChange(element) {
    if (activeElement) {
      activeElement.classList.remove("active");
      const previousElementAltAttribute = activeElement
        .querySelector(".rovo-slider-thumbnail__image")
        .getAttribute("alt");

      const previousFullScreenAsset = selectors.mainContainer.querySelector(
        `[alt="${previousElementAltAttribute}"]`
      );
      previousFullScreenAsset.classList.remove("active");
    }

    element.classList.add("active");
    const activeElementAltAttribute = element
      .querySelector(".rovo-slider-thumbnail__image")
      .getAttribute("alt");

    const fullScreenAsset = selectors.mainContainer.querySelector(
      `[alt="${activeElementAltAttribute}"]`
    );
    fullScreenAsset.classList.add("active");
    activeElement = element;
  }

  function initReelAnimation() {
    const thumbnails =
      window.innerWidth >= 768
        ? selectors.thumbnailItemToArrayDesktop
        : selectors.thumbnailItemToArrayMobile;

    const loop = horizontalLoop(thumbnails, {
      paused: false,
      repeat: -1,
      speed: 0.25,
      draggable: true, // make it draggable
      center: true, // active element is the one in the center of the container rather than th left edge
      onChange: (element, index) => {
        // when the active element changes, this function gets called.
        handleSwitchAssetsOnChange(element);
      }
    });

    // in case you change center prop to false, remove the line below.
    loop.toIndex(0, {
      duration: 0
    });
  }

  function handlePopulateMainContainerDesktop() {
    // here is how we populate the main container
    selectors.thumbnailItemToArrayDesktop.forEach((element) => {
      const activeElementSource = element.querySelector(".rovo-main-source");
      const activeElementImageSourceDesktop = activeElementSource.getAttribute(
        "data-image-src-desktop"
      );

      const activeElementVideoSourceDesktop = activeElementSource.getAttribute(
        "data-video-src-desktop"
      );

      let assetComponentAppend;

      if (activeElementImageSourceDesktop) {
        assetComponentAppend = `<img class="rovo-reels-image" src="${activeElementImageSourceDesktop}" alt="${activeElementSource.getAttribute(
          "data-image-description-desktop"
        )}">`;
      }

      if (activeElementVideoSourceDesktop) {
        assetComponentAppend = `<video class="rovo-reels-video" autoplay muted loop playsinline alt="${activeElementSource.getAttribute(
          "data-image-description-desktop"
        )}">
        <source src="${activeElementVideoSourceDesktop}" type="video/mp4">
      </video>`;
      }

      selectors.mainContainer.insertAdjacentHTML(
        "beforeend",
        assetComponentAppend
      );
    });
  }

  function handlePopulateMainContainerMobile() {
    // here is how we populate the main container
    selectors.thumbnailItemToArrayMobile.forEach((element) => {
      const activeElementSource = element.querySelector(".rovo-main-source");

      const activeElementImageSourceMobile = activeElementSource.getAttribute(
        "data-image-src-mobile"
      );

      const activeElementVideoSourceMobile = activeElementSource.getAttribute(
        "data-video-src-mobile"
      );

      let mobileAssetComponentAppend;

      if (activeElementImageSourceMobile) {
        mobileAssetComponentAppend = `<img class="rovo-reels-image" src="${activeElementImageSourceMobile}" alt="${activeElementSource.getAttribute(
          "data-image-description-mobile"
        )}">`;
      }

      if (activeElementVideoSourceMobile) {
        mobileAssetComponentAppend = `<video class="rovo-reels-video" autoplay muted loop playsinline alt="${activeElementSource.getAttribute(
          "data-image-description-mobile"
        )}">
          <source src="${activeElementVideoSourceMobile}" type="video/mp4">
        </video>`;
      }

      selectors.mainContainer.insertAdjacentHTML(
        "beforeend",
        mobileAssetComponentAppend
      );
    });
  }

  /*
  This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

  Features:
    - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
    - When each item animates to the left or right enough, it will loop back to the other side
    - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
    - The returned timeline will have the following methods added to it:
    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
    - times - an Array of the times on the timeline where each element hits the "starting" spot.
    */
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: {
          ease: "none"
        },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100)
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      spaceBefore = [],
      xPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i) => xPercents[i]
        });
        totalWidth = getTotalWidth();
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset
            );
          });
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond
            },
            0
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                )
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
              },
              distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      proxy;
    gsap.set(items, {
      x: 0
    });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", () => refresh(true));

    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = {
          time: timeWrap
        };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars) => toIndex(tl.current() - 1, vars);
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio,
        startProgress,
        draggable,
        dragSnap,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio)
          ),
        syncIndex = () => tl.closestIndex(true);
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          gsap.killTweensOf(tl);
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          gsap.set(proxy, {
            x: startProgress / -ratio
          });
          tl.pause();
        },
        onDrag: align,
        onThrowUpdate: align,
        inertia: true,
        snap: (value) => {
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          return (time + dif) / tl.duration() / -ratio;
        },
        onRelease: () => {
          tl.play();
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: syncIndex
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    return tl;
  }

  // init
  handleFakeBackground();
  handleMainPopulationBasedOnScreenSize();

  if (window.innerWidth > 1024) {
    handleMouseMoveOnDesktop();
  }

  window.addEventListener("resize", () => {
    handleFakeBackground();
    if (window.innerWidth > 1024) {
      handleMouseMoveOnDesktop();
    }
  });

  function handleMainPopulationBasedOnScreenSize() {
    if (window.innerWidth >= 768) {
      handlePopulateMainContainerDesktop();
    } else {
      handlePopulateMainContainerMobile();
    }
  }

  if (sessionStorage.getItem("homeAnimation") === "true") {
    initReelAnimation();
  } else {
    setTimeout(() => {
      initReelAnimation();
    }, 3300);
  }
}

gsapReelSlider();
