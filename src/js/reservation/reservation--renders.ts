import {THotelItem, THotelItemAddons, THotelItemAmenities} from "./reservation--types"

// Function for rendering hotel item
export const renderHotelItem = (item: THotelItem, nights: number) => {
  const html = `
    <div class="i-hotel-result d-flex gap-2">
      <div class="i-hotel-result__img">
        <div class="img u-posr overflow-hidden --cover --ratio-3-2">
          <picture>
            <img class="entered loaded" src="${item._embedded.pictures[0]?.["full"]}" data-src="${item._embedded.pictures[0]?.["full"]}" alt="" width="320" height="220" draggable="false">
          </picture>
        </div>
      </div>

      <div class="i-hotel-result__content w-100 d-flex flex-column gap-3">
        <div class="i-hotel-result__header d-flex justify-content-between align-items-start gap-2">
          <div class="i-hotel-result__left">
            <h3 class="u-h3">${item.description}</h3>
          </div>

          <div class="i-hotel-result__right d-flex flex-column align-items-end flex-shrink-0">
            <p class="i-hotel-result__price mb-0 u-fw-600 u-h4 text-end">${item.full_formatted_price}</p>
            <p class="i-hotel-result__price-subtext mb-0 u-fz-xs u-fw-500 text-end">Cena za osobu na ${nights} noci</p>
          </div>
        </div>

        <div class="i-hotel-result__body d-flex flex-wrap gap-1">
          <span class="i-tag --sm d-inline-flex align-items-center text-center justify-content-center gap-1 u-fw-700"> <span class="i-tag__title">${item.room_size_max} m²</span></span>
          ${item._embedded.amenities
            .map(
              (amenity: THotelItemAmenities) =>
                `<span class="i-tag --sm d-inline-flex align-items-center text-center justify-content-center gap-1 u-fw-700"> <span class="i-tag__title">${amenity.description}</span></span>`,
            )
            .join("")}
          <span class="i-tag --sm --show-more d-inline-flex align-items-center text-center justify-content-center gap-1 u-fw-700"> <span class="i-tag__title"></span></span>
        </div>

        <div class="i-hotel-result__footer d-flex flex-wrap gap-1 mt-auto">
          ${item._embedded.addons
            .map(
              (addon: THotelItemAddons) =>
                `<span key=${addon.addon_id} class="i-hotel-result__addon d-inline-flex align-items-center gap-1 u-fw-500 u-fz-sm">
                  <div class="i-tag__icon">
                    <span class="icon d-flex align-items-center justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </span>
                  </div>
                  <span class="i-tag__title">${addon.description}</span>
                </span>`,
            )
            .join("")}
        </div>
      </div>
    </div>
    `
  return html
}
