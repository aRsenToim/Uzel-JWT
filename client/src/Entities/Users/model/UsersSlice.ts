import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "./types";


interface IInitialState {
    Users: IUser[],
    maxPage: number
    total: number
}

const initialState: IInitialState = {
    Users: [],
    maxPage: 0,
    total: 0
}


const UsersSlice = createSlice({
    name: "UsersSlice",
    initialState,
    reducers: {
        addUsers(state, action: PayloadAction<IUser[]>){
            state.Users.push(...action.payload)
        },
        setMaxPage(state, action: PayloadAction<number>){
            state.maxPage = action.payload
        },
        setTotal(state, action: PayloadAction<number>){
            state.total = action.payload
        }
    }
})


export default UsersSlice.reducer
export const {addUsers, setMaxPage, setTotal} = UsersSlice.actions