export {}

const transitionLength = 300

const openModal = (modal: HTMLElement) => {
  modal.classList.add("--open")
  modal.classList.remove("--hidden")
}

export const closeModal = (modal: HTMLElement) => {
  modal.classList.remove("--open")
  setTimeout(() => {
    modal.classList.add("--hidden")
  }, transitionLength)
}

const initTriggers = () => {
  const triggers = document.querySelectorAll("[data-modal-target]:not(.--initialized)")

  triggers.forEach((trigger) => {
    const modalTarget = document.getElementById(trigger.getAttribute("data-modal-target") ?? "")

    if (!modalTarget) return

    trigger.addEventListener("click", (event) => {
      event.preventDefault()
      openModal(modalTarget)
    })

    trigger.classList.add("--initialized")
  })
}

const initModals = () => {
  const modals = document.querySelectorAll<HTMLElement>(".c-modal:not(.--initialized)")

  modals.forEach((modal) => {
    const closeButtons = modal.querySelectorAll(".c-modal__close")
    const submitButtons = modal.querySelectorAll(".btn.--modal-submit")

    modal.style.setProperty("--transtion-length", `${transitionLength}ms`)

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", (event) => {
        event.preventDefault()
        closeModal(modal)
      })
    })

    submitButtons.forEach((submitButton) => {
      submitButton.addEventListener("click", (event) => {
        event.preventDefault()
        closeModal(modal)
      })
    })

    modal.addEventListener("click", (event) => {
      if (modal === event.target) {
        closeModal(modal)
      }
    })

    modal.addEventListener("open", () => {
      openModal(modal)
    })

    modal.addEventListener("close", () => {
      closeModal(modal)
    })

    modal.classList.add("--initialized")
  })
}

const init = () => {
  initTriggers()
  initModals()
}

init()

// In case you need reinitialize just dispatch event and you dont have to worry about imports
// document.dispatchEvent(new Event("reinitModals"))
document.addEventListener("reinitModals", init)
