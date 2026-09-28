import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../AppStore";
import { Navigate, Outlet } from "react-router-dom";
import { AuthMe } from "../../Entities/Auth";
import Header from "../../widgets/header/header";



const ProtectedLayout: FC = () => {
    const { isAuthChecked, profile } = useAppSelector(state => state.UserSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isAuthChecked) {
            dispatch(AuthMe())
        }
    }, [isAuthChecked])

    if (!profile && isAuthChecked) return <Navigate to={'/login'} />

    return <div>
        <Header image={profile?.image ?? ""} name={profile?.name ?? ""}/>
        <Outlet />
    </div>
}


export default ProtectedLayout