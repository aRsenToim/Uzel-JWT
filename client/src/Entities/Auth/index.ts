import { RegistAction, AuthMe, LoginAction, LogoutAction, sendVerifyUserAction, verifiedUserAction } from './actions/AuthAction';
import TokensSlice, { setAccessToken } from './model/tokensSlice'
import UserSlice from "./model/UserSlice"
import AuthHeader from './ui/AuthHeader/AuthHeader';
import ProfileSetting from './ui/ProfileSetting/ProfileSetting';



export {
    TokensSlice,
    setAccessToken,
    UserSlice,
    RegistAction,
    AuthHeader,
    AuthMe,
    LoginAction,
    LogoutAction,
    sendVerifyUserAction,
    verifiedUserAction,
    ProfileSetting
}