import type { FC } from 'react'
import s from './button.module.scss'

interface IProps {
    title: string,
    click: () => void
}

const Button: FC<IProps> = ({title, click}) => {
    return <button className={s.Button} onClick={click}>{title}</button>
}

export default Button