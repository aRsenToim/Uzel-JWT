import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../AppStore";
import { Navigate, Outlet } from "react-router-dom";
import { AuthMe } from "../../Entities/Auth";



const GuestLayout: FC = () => {
    const { isAuthChecked, profile } = useAppSelector(state => state.UserSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isAuthChecked) {
            dispatch(AuthMe())
        }
    }, [isAuthChecked])

    if(profile && isAuthChecked) return <Navigate to={'/'}/>

    return <Outlet/>
}


export default GuestLayout