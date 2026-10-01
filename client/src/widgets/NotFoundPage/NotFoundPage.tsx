import type { FC } from 'react'
import s from './NotFoundPage.module.scss'
import { NavLink } from "react-router-dom"


const NotFoundPage: FC = () => {
    return <div className={s.NotFound}>
        <p className={s.NotFound__code}>404</p>
        <h1 className={s.NotFound__title}>Страница не найдена</h1>
        <p className={s.NotFound__subtitle}>
            Такой страницы не существует или она была перемещена.
        </p>
        <NavLink to="/" className={s.NotFound__link}>
            На главную
        </NavLink>
    </div>
}


export default NotFoundPage