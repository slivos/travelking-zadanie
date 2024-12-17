import flatpickr from "flatpickr"
import {Instance} from "flatpickr/dist/types/instance"
import {Slovak} from "flatpickr/dist/l10n/sk.js"
import {getCheckins} from "js/checkins/checkins-handle"
import {getNights, getParams, handleDisabledSubmitBtn} from "js/reservation/reservation-handle"
import {TDay} from "js/checkins/checkins--types"

export {}

/**
 * If you need do something with the flatpickr instance, you can use the following interface
 * @example import {FlatPickerElement} from "@components/fields/date-field/date-field"
 *
 * const flatpicerInput = document.querySelector<FlatPickerElement>(".your-flatpickr-input, .f-date__input.flatpicker")
 *
 * flatpicerInput._flatpickr
 */
export interface FlatPickerElement extends HTMLInputElement {
  _flatpickr?: Instance
}

const init = () => {
  const dates = document.querySelectorAll(".f-date:not(.--initialized)")
  const mobileQuery = window.matchMedia("(max-width: 61.999em)")

  dates.forEach(async (date) => {
    const input = date.querySelector<HTMLInputElement>(".f-date__input.flatpicker")

    if (!input) return

    input.type = "text"
    input.setAttribute("readonly", "")
    let data: TDay[]

    // Get calendar availabilities data
    await getCheckins().then((res) => {
      data = res
    })

    // Render different calendar layout for desktop and mobile
    const handleCalendarLayout = (mediaQueryList: MediaQueryListEvent | MediaQueryList) => {
      if (mediaQueryList.matches) {
        return 1
      } else {
        return 2
      }
    }

    // Computed function with matching date
    const computedDate = (dateStr: string) => {
      return data.find((item) => item.date === dateStr)
    }

    // Computed function to compare price position
    const computedPricePosition = (dateStr: string, compare: string) => {
      return computedDate(dateStr)!.price_position === compare
    }

    // Common function for setting price element
    const setPriceElement = (dayElem: HTMLElement, priceClass: string, priceText: string) => {
      const priceElem = document.createElement("span")

      priceElem.className = priceClass
      priceElem.textContent = priceText
      dayElem.appendChild(priceElem)
    }

    // Function for setting price position classnames (high, middle, low)
    const setPricePosition = (dayElem: HTMLElement, dateStr: string) => {
      if (computedPricePosition(dateStr, "high")) {
        dayElem.className += " --high-price"
      } else if (computedPricePosition(dateStr, "middle")) {
        dayElem.className += " --middle-price"
      } else {
        dayElem.className += " --low-price"
      }
    }

    // Handler for onValueUpdate hook
    const handleOnValueUpdate = (value: Date[]) => {
      getParams(value[0], value[1])
      handleDisabledSubmitBtn()
    }

    // Handler for onDayCreate hook
    const handleOnDayCreate = (dObj: Date[], dStr: string, fp: Instance, dayElem: any) => {
      const dateStr = fp.formatDate(dayElem.dateObj, "Y-m-d") // Correctly format date as YYYY-MM-DD

      const whichIndex = () => {
        return data.findIndex((item) => item.date === dateStr) !== -1
      }

      if (whichIndex()) {
        setPriceElement(dayElem, "f-date__price", `${computedDate(dateStr)!.price.toString()} €`)
        setPricePosition(dayElem, dateStr)
      } else {
        // Add a span with a "-" if there is no price for the date
        setPriceElement(dayElem, "f-date__price", "-")
      }
    }

    // Handler for onClose hook
    const handleOnClose = (selectedDates: Date[]) => {
      const dateStart = new Date(selectedDates[0] as Date)
      const dateEnd = new Date(selectedDates[1] as Date)
      const timeDifference = dateEnd.getTime() - dateStart.getTime()
      const days = Math.floor(timeDifference / (1000 * 3600 * 24))

      getNights(days)
    }

    const flatpickerOptions: flatpickr.Options.Options = {
      enableTime: false,
      inline: true,
      minDate: "today",
      maxDate: "2025-07-01",
      mode: "range",
      showMonths: handleCalendarLayout(mobileQuery),
      locale: Slovak,
      onValueUpdate: (value) => handleOnValueUpdate(value),
      onDayCreate: (dObj, dStr, fp, dayElem) => handleOnDayCreate(dObj, dStr, fp, dayElem),
      onClose: (selectedDates) => handleOnClose(selectedDates),
    }
    flatpickr(input, flatpickerOptions)

    date.classList.add("--initialized")
  })
}
init()
document.addEventListener("dateReinit", init)
