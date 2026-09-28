import type { FC } from 'react'
import s from './UserCard.module.scss'
import type { IUser } from '../../model/types'


interface IProps {
    user: IUser
}

const UserCard: FC<IProps> = ({ user }) => {
    const isAdmin = user.role === "ADMIN"

    return (
        <div className={s.UserCard}>
            <img
                className={s.UserCard__avatar}
                src={user.image}
                alt={user.name}
            />

            <div className={s.UserCard__info}>
                <span className={s.UserCard__name}>{user.name}</span>
                <span className={s.UserCard__email}>{user.email}</span>
            </div>

            <div className={s.UserCard__meta}>
                <span className={`${s.UserCard__role} ${isAdmin ? s.UserCard__roleAdmin : ""}`}>
                    {isAdmin ? "Админ" : "Участник"}
                </span>
            </div>
        </div>
    )
}


export default UserCard