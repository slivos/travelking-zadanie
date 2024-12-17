import {makeRequest} from "js/make-request/make-request"
import {formatDate} from "../../utils/formatDate"
import {THotelItem} from "./reservation--types"
import {renderHotelItem} from "./reservation--renders"

const getOptions = {
  method: "GET",
}
let apiEndpoint: string
let nights: number = 0

const submitBtn = document.querySelector<HTMLButtonElement>(".f-reservation__submit")
const hotelResultsGroup = document.querySelector(".g-hotel-results")
const emptyResults = document.querySelector(".s-hotel-availability__empty")

// Get checkin and checkout dates
export const getParams = (checkin: Date | undefined, checkout: Date | undefined) => {
  if (checkin || checkout) {
    apiEndpoint = `https://api.travelcircus.net/hotels/17080/quotes?locale=de_DE&checkin=${formatDate(checkin)}&checkout=${formatDate(checkout)}&party=%7B%22adults%22:2,%22children%22:[]%7D&domain=de`
  }
}

// Fetch and render data with hotel quotes, handle empty data
const getReservation = async () => {
  const data = await makeRequest(apiEndpoint, getOptions)
  if (hotelResultsGroup) hotelResultsGroup.innerHTML = ""

  const quotes = data?._embedded?.hotel_quotes

  if (!quotes.length) {
    emptyResults?.classList.remove("--hidden")
    hotelResultsGroup?.classList.add("--hidden")
  } else {
    emptyResults?.classList.add("--hidden")
    hotelResultsGroup?.classList.remove("--hidden")

    quotes.forEach((item: THotelItem) => {
      if (hotelResultsGroup) hotelResultsGroup.innerHTML += renderHotelItem(item, nights)
    })

    handleShowMore()
  }
}

// Set show more tag feature, when click on show more, show hidden tags
const setShowMore = (showMore: HTMLElement, hiddenTags: HTMLElement[], isHidden: boolean, length: number) => {
  showMore.addEventListener("click", () => {
    isHidden = !isHidden

    showMore.style.display = "none"
    hiddenTags?.forEach((item) => item.classList.toggle("--hidden"))
  })

  hiddenTags.forEach((tag) => {
    tag.classList.add("i-tag__hidden", "--hidden")
    showMore.textContent = `+${length}`
  })
}

// Find show more tags, loop through them, create array with hidden tags
const handleShowMore = () => {
  const showMores = document.querySelectorAll<HTMLElement>(".i-tag.--show-more")

  showMores.forEach((showMore) => {
    const hotelResultBody = showMore.closest(".i-hotel-result__body")
    const tags = hotelResultBody?.querySelectorAll(".i-tag:not(.--show-more)") as NodeListOf<HTMLElement>

    const hiddenTags = Array.from(tags).slice(4)
    const length = hiddenTags.length
    const isHidden = true

    setShowMore(showMore, hiddenTags, isHidden, length)
  })
}

// Function for getting number of selected days
export const getNights = (days: number) => {
  nights = days
}

// Function for disabled state of button when apiEndpoint is undefined
export const handleDisabledSubmitBtn = () => {
  if (submitBtn)
    if (!apiEndpoint) {
      submitBtn.classList.add("--disabled")
    } else {
      submitBtn.classList.remove("--disabled")
    }
}
handleDisabledSubmitBtn()

// Event listener for submit button
submitBtn?.addEventListener("click", async (e) => {
  e.preventDefault()
  await getReservation()
})
