import type { CSSProperties, FC } from 'react'
import s from './button.module.scss'

interface IProps {
    title: string,
    click: () => void,
    style?: CSSProperties,
    disabled?: boolean
}

const Button: FC<IProps> = ({title, click, style, disabled}) => {
    return <button className={s.Button} style={style} onClick={click} disabled={disabled}>{title}</button>
}

export default Button