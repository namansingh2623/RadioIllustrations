export interface InfoGraphicsResponse {
    page: number
    pageSize: number
    totalItems: number
    albums: Album[]
}

export interface Album {
    id: number
    title: string
    description: string
    coverImage: string
    uploadedBy: string
    category: string
    like: any
    share: any
    createdAt: string
    updatedAt: string
}