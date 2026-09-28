import type { FC } from 'react'
import { NavLink } from "react-router-dom"
import s from './header.module.scss'

interface IProps {
    image: string,
    name: string
}

const Header: FC<IProps> = ({image, name}) => {

    return <header className={s.Header}>
        <NavLink to="/" className={s.Header__logo}>
            <img src="/icon.svg" alt="Uzel" />
        </NavLink>
        <NavLink to="/profile" className={s.Header__profile}>
            <img
                src={image}
                alt={name ?? "Профиль"}
                className={s.Header__avatar}
            />
        </NavLink>
    </header>
}


export default Header