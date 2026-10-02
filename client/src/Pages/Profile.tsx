import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "../App/AppStore"
import ProfileCard from "../Entities/Auth/ui/ProfileCard/ProfileCard"
import { LogoutAction, ProfileSetting, sendVerifyUserAction, verifiedUserAction } from "../Entities/Auth"




const ProfilePage: FC = () => {
    const { profile, isStartVerified } = useAppSelector(state => state.UserSlice)
    const dispatch = useAppDispatch();

    return <div style={{ width: "60%", margin: "50px auto" }}>
        {profile ? <div>
            <ProfileCard logout={() => { dispatch(LogoutAction()) }} user={profile} />
            <ProfileSetting accountVerified={profile.isVerified} email={profile.email} sendVerifyUserAction={() => {dispatch(sendVerifyUserAction())}}
            verifiedUserAction={(code: string) => {dispatch(verifiedUserAction(code))}} isStartVerified={isStartVerified} />
        </div> : ""}

    </div>
}


export default ProfilePage