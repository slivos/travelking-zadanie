import {makeRequest} from "js/make-request/make-request"

const getOptions = {
  method: "GET",
}

const apiEndpoint =
  "https://api.travelcircus.net/hotels/17080/checkins?E&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de&date_start=2025-01-01&date_end=2025-06-31"

// Fetch data with hotel availabilities for calendar and use this function in 'components/fields/date-field/date-field.ts'
export const getCheckins = async () => {
  const data = await makeRequest(apiEndpoint, getOptions)

  const availabilities = data?._embedded?.hotel_availabilities

  if (availabilities.length) {
    return availabilities
  }
}
