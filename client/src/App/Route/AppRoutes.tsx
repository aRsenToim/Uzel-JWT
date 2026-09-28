import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { GuestRoutes, protectedRoutes, type IRoute } from ".";
import ProtectedLayout from "../AppLayouts/ProtectedLayout";
import GuestLayout from "../AppLayouts/GuestLayout";



const AppRoutes: FC = () => {
    return <Routes>
        <Route element={<ProtectedLayout />}>
            {protectedRoutes.map((route: IRoute) => <Route path={route.name} element={<route.element />} />)}
        </Route>
        <Route element={<GuestLayout />}>
            {GuestRoutes.map((route: IRoute) => <Route path={route.name} element={<route.element />} />)}
        </Route>
    </Routes>
}


export default AppRoutes