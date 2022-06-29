export interface User {
    name: string,
    email: string,
    organisation: string,
}

export interface CreateUserPostRequest {
    name: string,
    email: string,
    password: string,
    organisation: string,
}