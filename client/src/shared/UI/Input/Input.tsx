import type { InputHTMLAttributes } from "react";
import s from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = ({ label, id, ...rest }: InputProps) => {
    return (
        <div className={s.field}>
            <label className={s.label} htmlFor={id}>
                {label}
            </label>
            <input className={s.input} id={id} {...rest} />
        </div>
    );
}

export default Input