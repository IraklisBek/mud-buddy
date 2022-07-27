export interface Building {
    id?: number;
    title: string,
    description: string,
    photos: string[],
    tags: string[],
    lng: number,
    lat: number,
    address?: string,
}