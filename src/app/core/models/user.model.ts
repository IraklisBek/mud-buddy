import { Building } from "./building.model";

export interface User {
    name: string,
    email: string,
    organisation: string,
    buildings: Building[]
}

export interface CreateUserPostRequest {
    name: string,
    email: string,
    password: string,
    organisation: string
}