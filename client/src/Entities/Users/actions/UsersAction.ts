import type { AppDispatch } from "../../../App/AppStore"
import { UsersApi } from "../api/UsersApi"
import { addUsers, setMaxPage, setTotal } from "../model/UsersSlice"



export const GetUsersFetch = (page: number) => {
    return (dispatch: AppDispatch) => {
        UsersApi.getUsers(page).then(res => {
            dispatch(addUsers(res.users))
            dispatch(setMaxPage(res.totalPages))
            dispatch(setTotal(res.total))
        })
    }
}

export const AddUsersFetch = (page: number) => {
    return (dispatch: AppDispatch) => {
        UsersApi.getUsers(page).then(res => {
            dispatch(addUsers(res.users))
        })
    }
}