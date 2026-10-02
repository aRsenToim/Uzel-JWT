
export interface IError {
    error: string
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    role: string,
    status: string,
    image: string,
    isVerified: boolean
}


export interface IResponseAuth {
    accessToken: string,
    user: IUser
}
export interface IResponseAuthMe {
    user: IUser
}