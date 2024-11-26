
export interface Ievent {
    _id: string
    name: string
    maxPeoples: number
    idPlace: string
    date: Date
    endDate: Date
    description: string
    address: string
    price: number
    willAttend: number
    images: string[]
    userOwner: number
    coordinates: {
        lat: number,
        lng: number,
      }
}
