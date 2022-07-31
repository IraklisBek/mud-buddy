import { Position } from "./map.model";

export interface Building {
    id?: number,
    title: string,
    description: string,
    photos: string[],
    tags: Tag[],
    position: Position,
    address?: string,
}

export interface Tag {
    id?: number,
    title: string
}