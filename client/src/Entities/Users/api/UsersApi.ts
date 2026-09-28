import { type IResponseGetUsers } from './../model/types';
import { instance } from "../../../App/AppApi"




export const UsersApi = {
    async getUsers(page: number){
       const response = await instance.get<IResponseGetUsers>(`/users?page=${page}`)
       return response.data
    }
}