const main = new Splide('#rovo-reels-main', {
  type: 'fade',
  drag: false,
  pagination: false,
  arrows: false,
  rewind: false,
  updateOnMove: true,
  perPage: 1,
  perMove: 1,
  width: '100vw',
  height: '100vh',
  snap: true,
  speed: 0
});

const thumbnails = new Splide('#rovo-reels-thumbnail', {
  type: 'loop',
  drag: true,
  focus: 'center',
  arrows: false,
  rewind: false,
  fixedWidth: 30,
  fixedHeight: 42,
  isNavigation: true,
  gap: 0.5,
  pagination: false,
  perPage: 1,
  perMove: 1,
  updateOnMove: true,
  snap: true,
  speed: 0,
  dragMinThreshold: {
    mouse: 30,
    touch: 20,
  },
  autoScroll: {
    speed: 0.8,
    pauseOnHover: true,
    pauseOnFocus: true
  },
})

thumbnails.on('active', () => {
  main.go(`>${thumbnails.index}`)
})

thumbnails.on('dragged', () => {
  main.go(`>${thumbnails.index}`)
})

main.sync(thumbnails);
main.mount();
thumbnails.mount(window.splide.Extensions)

if (window.innerWidth < 768) {
  const headerButtonToggle = document.querySelector('.rovo-header-mobile__btn');
  const navMobile = document.querySelector('.rovo-header-anchor__nav-wrapper');
  const anchorItems = document.querySelectorAll('.rovo-header-anchor__item');
  const header = document.querySelector('header')
  headerButtonToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    header.classList.toggle('rovo-header-bg-white')
    document.body.classList.toggle('overflow-hidden');
  })

  anchorItems.forEach((el) => {
    el.addEventListener('click', () => {
      navMobile.classList.remove('open');
      header.classList.toggle('rovo-header-bg-white')
      document.body.classList.toggle('overflow-hidden');
    })
  })
}