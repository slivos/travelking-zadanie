import Headroom from "headroom.js"

const mainHeader = document.querySelector(".m-header")

const headRoomHeaderOptions: Headroom.HeadroomOptions = {
  offset: mainHeader?.clientHeight ?? 0,
}

export const headRoomHeader = mainHeader ? new Headroom(mainHeader, headRoomHeaderOptions) : null

if (headRoomHeader) headRoomHeader.init()
