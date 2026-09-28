


export interface IUser {
    id: string,
    name: string,
    email: string,
    role: string,
    image: string
}

export interface IResponseGetUsers {
    users: IUser[],
    page: number,
    totalPages: number,
    total: number
}