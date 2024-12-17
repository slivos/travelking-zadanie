export {}

const mainNav = document.querySelector(".m-nav")

const overlayHeader = document.querySelector(".c-overlay-header")

export const mobileQuery = window.matchMedia("(max-width: 61.999em)") // Change to your needs

const closers = document.querySelectorAll(".--js-main-nav-closer")
const openers = document.querySelectorAll(".--js-main-nav-opener")
const togglers = document.querySelectorAll(".--js-main-nav-toggler")

export const closeMenu = (event?: Event) => {
  event?.preventDefault()
  mainNav?.classList.remove("--open")
  overlayHeader?.classList.remove("--show")
  document.body.style.setProperty("overflow", null)
}

const openMenu = (event: Event) => {
  event.preventDefault()
  mainNav?.classList.add("--open")
  mainNav?.classList.add("--transition")
  overlayHeader?.classList.add("--show")
  document.body.style.setProperty("overflow", "hidden")
}

const toggleMenu = (event: Event) => {
  mainNav?.classList.contains("--open") ? closeMenu(event) : openMenu(event)
}

export const removeTrainsition = () => mainNav?.classList.remove("--transition")

closers.forEach((closer) => {
  closer.addEventListener("click", closeMenu)
})
openers.forEach((opener) => {
  opener.addEventListener("click", openMenu)
})
togglers.forEach((toggler) => {
  toggler.addEventListener("click", toggleMenu)
})
