export interface Building {
    id?: number,
    title: string,
    description: string,
    photos: string[],
    tags: Tag[],
    lng: number,
    lat: number,
    address?: string,
}

export interface Tag {
    id?: number,
    title: string
}