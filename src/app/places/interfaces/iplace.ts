export interface Iplace {
    _id: string
    name: string
    types: string
    description: string
    images: string[]
    address: string
    tag: string
    totalStarts: number
    coordinates: {
        lat: number,
        lng: number,
      }
}
