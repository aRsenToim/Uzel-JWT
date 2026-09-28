import axios from "axios";
import { store } from "./AppStore";
import { setAccessToken } from "../Entities/Auth/model/tokensSlice";



export const instance = axios.create({
    baseURL: "http://localhost:3003/api/",
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    const token = store.getState().TokensSlice.accessToken

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = axios
            .post<{ accessToken: string }>(
                `${instance.defaults.baseURL}auth/refresh`,
                {},
                { withCredentials: true }
            )
            .then((res) => {
                const token = res.data.accessToken
                store.dispatch(setAccessToken(token))
                return token
            })
            .finally(() => {
                refreshPromise = null
            })
    }
    return refreshPromise
}

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const newToken = await refreshAccessToken()
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return instance(originalRequest)
            } catch {
                store.dispatch(setAccessToken(null))
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)