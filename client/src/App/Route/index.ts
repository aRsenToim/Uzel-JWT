import type React from "react";
import Home from "../../Pages/Home";
import Regist from "../../Pages/Regist";
import Login from "../../Pages/Login";
import Profile from "../../Pages/Profile";

enum RoutesName {
    Home='/',
    Users='/users',
    Login='/login',
    Regist='/regist',
    Profile='/profile'
}

export interface IRoute{
    name: string,
    element: React.ElementType
}

export const protectedRoutes: IRoute[] = [
    {
        name: RoutesName.Home,
        element: Home
    },
    {
        name: RoutesName.Profile,
        element: Profile
    },
]

export const GuestRoutes: IRoute[] = [
    {
        name: RoutesName.Regist,
        element: Regist
    },
    {
        name: RoutesName.Login,
        element: Login
    }
]