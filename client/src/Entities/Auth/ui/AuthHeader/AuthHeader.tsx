import type { FC } from 'react'
import s from './AuthHeader.module.scss'


interface IProps {
    title: string,
    subtitle: string
}

const AuthHeader: FC<IProps> = ({title, subtitle}) => {
    return <div className={s.AuthHeader}>
        <h1 className={s.AuthHeader__title}>{title}</h1>
        <p className={s.AuthHeader__subtitle}>
            {subtitle}
        </p>
    </div>
}

export default AuthHeader