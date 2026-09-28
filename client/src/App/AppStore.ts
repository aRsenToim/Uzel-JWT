import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'
import { useDispatch } from 'react-redux'
import TokensSlice from '../Entities/Auth/model/tokensSlice'
import UserSlice from '../Entities/Auth/model/UserSlice'
import { UsersSlice } from '../Entities/Users'



const rootReducers = combineReducers({
    TokensSlice,
    UserSlice,
    UsersSlice
})




export const setupStore = () => configureStore({
    reducer: rootReducers,
})

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = setupStore()
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;