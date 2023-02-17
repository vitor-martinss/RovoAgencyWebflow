const btnOpenModal = document.querySelectorAll('.rovo-list__item-content')
const btnCloseModal = document.querySelectorAll('.rovo-list-modal__item-close')
const overlayCloseModal = document.querySelectorAll('.rovo-list-modal--overlay')

const handleOpenModal = (element) => {
  element.forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.classList.add('modal-open');
      document.body.classList.add('overflow-hidden');
      document.querySelector('html').classList.add('overflow-hidden');
    })
  })
}


const handleCloseModal = (element) => {
  element.forEach((el) => {
    el.addEventListener('click', () => {
      el.closest('.rovo-list__item.modal-open').classList.remove('modal-open');
      document.body.classList.remove('overflow-hidden');
      document.querySelector('html').classList.remove('overflow-hidden');
    })
  })
}

handleOpenModal(btnOpenModal)
handleCloseModal(btnCloseModal)
handleCloseModal(overlayCloseModal)