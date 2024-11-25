export interface Iplace {
    _id: string
    name: string
    types: string
    description: string
    images: string[]
    address: string
    tags: string
    coordinates: {
        lat: number,
        lng: number,
      }
}
