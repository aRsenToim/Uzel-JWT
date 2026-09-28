import type { FC } from "react"
import { useAppDispatch, useAppSelector } from "../App/AppStore"
import ProfileCard from "../Entities/Auth/ui/ProfileCard/ProfileCard"
import { LogoutAction } from "../Entities/Auth"




const ProfilePage: FC = () => {
    const { profile } = useAppSelector(state => state.UserSlice)
    const dispatch = useAppDispatch();

    return <div style={{ width: "60%", margin: "50px auto" }}>{profile ? <ProfileCard logout={() => {dispatch(LogoutAction())}} user={profile} /> : ""}</div>
}


export default ProfilePage