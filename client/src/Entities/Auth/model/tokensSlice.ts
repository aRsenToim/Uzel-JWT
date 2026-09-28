import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IinitialState {
    accessToken: string | null,
}

const initialState: IinitialState = {
    accessToken: null
}


const TokensSlice = createSlice({
    name: "TokensSlice",
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.accessToken = action.payload
        }
    }
})

export default TokensSlice.reducer
export const { setAccessToken } = TokensSlice.actions