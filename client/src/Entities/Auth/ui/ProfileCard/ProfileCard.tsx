import type { FC } from 'react'
import s from './profileCard.module.scss'
import type { IUser } from '../../model/types'
import { Button } from '../../../../shared/UI'

interface IProps {
    user: IUser,
    logout: () => void
}

const ROLE_LABEL: Record<IUser["role"], string> = {
    USER: "Участник",
    ADMIN: "Администратор",
}

const ProfileCard: FC<IProps> = ({ user, logout }) => {
    return <div className={s.ProfileCard}>
        <div className={s.ProfileCard__head}>
            <img
                src={user.image}
                alt={user.name}
                className={s.ProfileCard__avatar}
            />
            <div>
                <p className={s.ProfileCard__name}>{user.name}</p>
                <p className={s.ProfileCard__role}>{ROLE_LABEL[user.role]}</p>
            </div>
        </div>

        <div className={s.ProfileCard__info}>
            <div className={s.ProfileCard__row}>
                <span className={s.ProfileCard__key}>Имя</span>
                <span className={s.ProfileCard__value}>{user.name}</span>
            </div>
            <div className={s.ProfileCard__row}>
                <span className={s.ProfileCard__key}>Email</span>
                <span className={s.ProfileCard__value}>{user.email}</span>
            </div>
            <div className={s.ProfileCard__row}>
                <span className={s.ProfileCard__key}>Роль</span>
                <span className={s.ProfileCard__value}>{ROLE_LABEL[user.role]}</span>
            </div>
            <div className={s.ProfileCard__row}>
                <span className={s.ProfileCard__key}>ID</span>
                <span className={s.ProfileCard__value}>{user.id}</span>
            </div>
        </div>

        <Button title='Выйти' click={logout}/>
    </div>
}

export default ProfileCard