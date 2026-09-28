import type { FC } from 'react'
import s from './UsersHeader.module.scss'


interface IProps {
    total: number
}

const UsersHeader: FC<IProps> = ({total}) => {
    return <div className={s.UsersHeader}>
        <div className={s.UsersHeader__top}>
            <div>
                <h1 className={s.UsersHeader__title}>Все пользователи</h1>
                <p className={s.UsersHeader__subtitle}>{total} участников</p>
            </div>
        </div>
    </div>
}

export default UsersHeader