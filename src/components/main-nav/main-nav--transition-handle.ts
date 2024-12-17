import {mobileQuery, closeMenu, removeTrainsition} from "./main-nav"

const handleMobileChange = (mediaQueryList: MediaQueryListEvent | MediaQueryList) => {
  if (mediaQueryList.matches) return // its mobile
  removeTrainsition()
  closeMenu()
}

mobileQuery.addEventListener("change", handleMobileChange)
