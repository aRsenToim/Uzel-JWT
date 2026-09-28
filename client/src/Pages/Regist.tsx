import { useEffect, useState, type FC } from "react";
import { AuthHeader, RegistAction } from "../Entities/Auth";
import { Button, Icon, Input } from "../shared/UI";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../App/AppStore";




const Regist: FC = () => {
    const navigate = useNavigate()
    const { accessToken } = useAppSelector(state => state.TokensSlice)

    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const dispatch = useAppDispatch();

    return <div style={{ width: "40%", margin: "50px auto" }}>
        <Icon />
        <AuthHeader title="Регистрация" subtitle="Создайте аккаунт, это займёт меньше минуты." />
        <Input label="Имя" placeholder="Аноним" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Input label="Пароль" placeholder="Минимум 8 символов" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button title="Создать аккаунт" click={() => {
            dispatch(RegistAction(email, name, password))
        }} />
        <p style={{ color: "var(--muted)", textDecoration: "none", fontSize: "13px", marginTop: "24px" }}>Уже есть аккаунт? <NavLink to={'/login'} style={{
            color: "var(--text)", borderBottom: "1px solid var(--faint)"
        }}>Войти</NavLink></p>
    </div>
}

export default Regist