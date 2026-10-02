import { isAxiosError } from "axios"
import type { AppDispatch } from "../../../App/AppStore"
import { AuthApi } from "../api/AuthApi"
import { setErrorForm, setIsAuthChecked, setIsStartVerified, setProfile } from "../model/UserSlice"
import type { IError } from "../model/types"
import { setAccessToken } from "../model/tokensSlice"





export const RegistAction = (email: string, name: string, password: string) => {
    return (dispatch: AppDispatch) => {
        AuthApi.regist(email, name, password).then((res) => {
            dispatch(setProfile(res.user))
            dispatch(setAccessToken(res.accessToken))
            dispatch(setIsAuthChecked())
        }).catch((err) => {
            const message = isAxiosError<IError>(err)
                ? err.response?.data.error ?? "Что-то пошло не так"
                : "Что-то пошло не так"
            dispatch(setErrorForm(message))
        })
    }
}


export const AuthMe = () => {
    return (dispatch: AppDispatch) => {
        AuthApi.authme().then((res) => {
            dispatch(setProfile(res.user))
        }).finally(() => {
            dispatch(setIsAuthChecked())
        })
    }
}

export const LoginAction = (email: string, password: string) => {
    return (dispatch: AppDispatch) => {
        AuthApi.login(email, password).then((res) => {
            dispatch(setProfile(res.user))
            dispatch(setAccessToken(res.accessToken))
            dispatch(setIsAuthChecked())
        })
    }
}

export const LogoutAction = () => {
    return (dispatch: AppDispatch) => {
        AuthApi.logout().then(() => {
            dispatch(setAccessToken(null))
            dispatch(setProfile(null))
        })
    }
}

export const sendVerifyUserAction = () => {
    return (dispatch: AppDispatch) => {
        AuthApi.verifAccount().then(() => {
            dispatch(setIsStartVerified())
        }).catch(() => {

        })
    }
}

export const verifiedUserAction = (code: string) => {
    return (dispatch: AppDispatch) => {
        AuthApi.verifiedUser(code).then(() => {
            AuthApi.authme().then((res) => dispatch(setProfile(res.user)))
        })
    }
}