import "css/style.css"
import {lazyLoading} from "./lazyload/lazyload-init"
import "@components/main-nav"
import "@components/main-header/main-header"
import "@components/items/menu-item/menu-item"
import {polyfill} from "smoothscroll-polyfill"
polyfill()

window.lazyloading = lazyLoading // add lazyloading to global window object

async function loadMain() {
  await import("./main")
}
loadMain()

async function loadModals() {
  if (document.querySelectorAll(".c-modal").length) {
    await import("@components/modal/modal")
  }
}
loadModals()

async function loadFlatpickr() {
  if (document.querySelectorAll(".flatpicker").length) {
    await import("js/flatpickr")
  }
}
loadFlatpickr()
