import { RegistAction, AuthMe, LoginAction, LogoutAction } from './actions/AuthAction';
import TokensSlice, { setAccessToken } from './model/tokensSlice'
import UserSlice from "./model/UserSlice"
import AuthHeader from './ui/AuthHeader/AuthHeader';



export {
    TokensSlice,
    setAccessToken,
    UserSlice,
    RegistAction,
    AuthHeader,
    AuthMe,
    LoginAction,
    LogoutAction
}