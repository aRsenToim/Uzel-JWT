import { instance } from "../../../App/AppApi"
import type { IResponseAuth, IResponseAuthMe, IUser } from "../model/types"



export const AuthApi = {
    async regist(email: string, name: string, password: string){
        const res = await instance.post<IResponseAuth>('/auth/regist', {email, name, password})
        return res.data
    },
    async authme(){
        const res = await instance.get<IResponseAuthMe>('/auth/me')
        return res.data
    },
    async login(email: string, password: string){
        const res = await instance.post<IResponseAuth>('/auth/login', {email, password})
        return res.data
    },
    async logout(){
        const res = await instance.post('/auth/logout')
        return res.data
    },
    async verifAccount(){
        const res = await instance.post('/auth/sendVerifyUser')
        return res.data
    },
    async verifiedUser(code: string){
        const res = await instance.post('/auth/verifiedUser', {code})
        return res.data
    }
}