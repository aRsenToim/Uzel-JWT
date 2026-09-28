import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "./types";

interface IinitialState {
    profile: IUser | null,
    errorForm: string,
    isAuthChecked: boolean,
}

const initialState: IinitialState = {
    profile: null,
    errorForm: "",
    isAuthChecked: false
}


const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IUser | null>){
        state.profile = action.payload
    },
    setErrorForm(state, action: PayloadAction<string>){
        state.errorForm = action.payload
    },
    setIsAuthChecked(state){
        state.isAuthChecked = true;
    }
  }  
})


export default UserSlice.reducer
export const {setErrorForm, setProfile, setIsAuthChecked} = UserSlice.actions