export type THotels = [THotelItem]

export type THotelItem = {
  base_capacity: number
  description: string
  full_formatted_price: string
  room_size_max: number
  _embedded: THotelItemEmbedded
}

type THotelItemEmbedded = {
  addons: THotelItemAddons[]
  amenities: THotelItemAmenities[]
  pictures: THotelItemPictures[]
}

export type THotelItemAddons = {
  addon_id: number
  description: string
}

export type THotelItemAmenities = {
  description: string
  name: string
}

type THotelItemPictures = {
  full: string
}
