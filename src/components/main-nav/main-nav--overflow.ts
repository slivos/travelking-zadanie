import {mobileQuery} from "./main-nav"

const submenuSecondLevels = document.querySelectorAll<HTMLElement>(".i-menu.--level-2 .i-menu__submenu")
const documentWidth = document.documentElement.offsetWidth
const isOverflowing = (box: DOMRect) => box.left < 0 || box.right > documentWidth

const handleOverflows = () => {
  if (mobileQuery.matches) return // its mobile, so we dont care

  submenuSecondLevels.forEach((element) => {
    element.classList.toggle("--mirror", isOverflowing(element.getBoundingClientRect()))
  })
}

const resizeObserver = new ResizeObserver(handleOverflows)
resizeObserver.observe(document.documentElement)
