function handleGSAPModalAnimation(element, transformValue, duration) {
  const modalTimeLine = new TimelineMax({ paused: true });
  const modalAnimation = modalTimeLine.to(element, {
    duration,
    transform: `${transformValue}`
  });

  modalAnimation.play();
}

function handleOpenModal() {
  document.querySelectorAll(".rovo-list__item-content").forEach((el) => {
    el.addEventListener("click", () => {
      // modal animation
      const modal = el.parentElement.querySelector(".rovo-list-modal");
      handleGSAPModalAnimation(modal, "translateX(0%)", 0.3);

      // responsible for overlay
      el.parentElement.classList.add("modal-open");

      // scroll page
      document.body.classList.add("overflow-hidden");
      document.querySelector("html").classList.add("overflow-hidden");

      // only applied on containers that has pills
      const clonePills = el.lastChild.cloneNode(true);
      const pillsTargetContainer = el.parentElement.querySelector(
        ".rovo-js-append-pills"
      );
      pillsTargetContainer && pillsTargetContainer.append(clonePills);
    });
  });
}

function handleCloseModalByClickingOnOverlay() {
  document.querySelectorAll(".rovo-list-modal--overlay").forEach((el) => {
    el.addEventListener("click", () => {
      // only applied on containers that has pills
      const clonedPills = el
        .closest(".modal-open")
        .querySelector(".rovo-js-append-pills");
      clonedPills && clonedPills.lastChild.remove();

      // responsible for overlay
      el.closest(".rovo-list__item.modal-open").classList.remove("modal-open");

      // modal animation
      const modal = el.parentNode.querySelector(".rovo-list-modal");
      handleGSAPModalAnimation(modal, "translateX(105%)", 0.3);

      // scroll page
      document.body.classList.remove("overflow-hidden");
      document.querySelector("html").classList.remove("overflow-hidden");
    });
  });
}

function handleCloseModalFromCloseButton() {
  document.querySelectorAll(".rovo-list-modal__item-close").forEach((el) => {
    el.addEventListener("click", () => {
      // only applied on containers that has pills
      const clonedPills = el
        .closest(".modal-open")
        .querySelector(".rovo-js-append-pills");
      clonedPills && clonedPills.lastChild.remove();

      // responsible for overlay
      el.closest(".rovo-list__item.modal-open").classList.remove("modal-open");

      // modal animation
      const modal = el.closest(".rovo-list-modal");
      handleGSAPModalAnimation(modal, "translateX(105%)", 0.3);

      // scroll page
      document.body.classList.remove("overflow-hidden");
      document.querySelector("html").classList.remove("overflow-hidden");
    });
  });
}

handleCloseModalByClickingOnOverlay();
handleCloseModalFromCloseButton();
handleOpenModal();
