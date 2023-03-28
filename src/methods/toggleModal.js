function handleGSAPModalAnimation(element, transformValue, duration) {
  const modalTimeLine = new TimelineMax({ paused: true });
  const modalAnimation = modalTimeLine.to(element, {
    duration,
    transform: `${transformValue}`
  });

  modalAnimation.play();
}

function handleCloseModal(element) {
  document.querySelectorAll(element).forEach((el) => {
    el.addEventListener("click", () => {
      // delete cloned pills
      document
        .querySelectorAll("rovo-list__item-pills--clone")
        .forEach((el) => {
          el.remove();
        });

      // remove overlay
      document
        .querySelectorAll(".rovo-list-modal--overlay--clone")
        .forEach((el) => el.remove());

      // modal animation
      document.querySelectorAll(".rovo-list-modal--clone").forEach((el) => {
        handleGSAPModalAnimation(el, "translateX(105%)", 0.3);

        setTimeout(() => {
          el.remove();
        }, 300);
      });

      // scroll page
      bodyScrollLock.clearBodyLocks();
      document.body.classList.remove("overflow-hidden");
      document.querySelector("html").classList.remove("overflow-hidden");
    });
  });
}

function handleOpenModal() {
  document.querySelectorAll(".rovo-list__item-content").forEach((el) => {
    el.addEventListener("click", () => {
      // overlay
      const overlay = el.parentElement.querySelector(
        ".rovo-list-modal--overlay"
      );

      // modal animation
      const modal = el.parentElement.querySelector(".rovo-list-modal");

      const overlayCloned = overlay.cloneNode(true);
      const modalCloned = modal.cloneNode(true);

      overlayCloned.classList.add("rovo-list-modal--overlay--clone");
      modalCloned.classList.add("rovo-list-modal--clone");

      // only applied on containers that has pills
      if (el.querySelector(".rovo-list__item-pills")) {
        const clonePills = el.lastChild.cloneNode(true);
        const pillsTargetContainer = modalCloned.querySelector(
          ".rovo-js-append-pills"
        );

        clonePills.classList.add("rovo-list__item-pills--clone");
        pillsTargetContainer.append(clonePills);
      }

      document.body.appendChild(overlayCloned);
      document.body.appendChild(modalCloned);

      handleGSAPModalAnimation(modalCloned, "translateX(0%)", 0.3);

      // avoid scroll the page
      bodyScrollLock.lock(document.querySelector("body"));
      bodyScrollLock.unlock(modalCloned);

      document.body.classList.add("overflow-hidden");
      document.querySelector("html").classList.add("overflow-hidden");

      // functions below are placed here in order to add a listener to cloned Node
      handleCloseModal(".rovo-list-modal__item-close");
      handleCloseModal(".rovo-js-modal-link");
      handleCloseModal(".rovo-list-modal--overlay--clone");
    });
  });
}

handleOpenModal();
