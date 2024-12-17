export {}

const mobileQuery = window.matchMedia("(max-width: 61.999em)")

const itemsWithSubmenu = document.querySelectorAll(".i-menu.--has-submenu")
itemsWithSubmenu.forEach((item) => {
  const submenuButton = item.querySelector(".i-menu__submenu-button")

  const handleSubmenu = (event: Event) => {
    if (!mobileQuery.matches) return // its desktop, so we don't care

    event.preventDefault()
    item.classList.toggle("--open")
  }

  submenuButton?.addEventListener("click", handleSubmenu)
})
