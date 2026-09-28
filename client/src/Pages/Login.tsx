import { useState, type FC } from "react";
import { Button, Icon, Input } from "../shared/UI";
import { AuthHeader, LoginAction } from "../Entities/Auth";
import { useAppDispatch } from "../App/AppStore";
import { NavLink, useNavigate } from "react-router-dom";




const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return <div style={{ width: "40%", margin: "50px auto" }}>
        <Icon />
        <AuthHeader title="Вход" subtitle="Введите email и пароль, чтобы продолжить." />
        <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Input label="Пароль" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        <Button title="Войти" click={() => {
            dispatch(LoginAction(email, password))
        }} />
        <p style={{ color: "var(--muted)", textDecoration: "none", fontSize: "13px", marginTop: "24px" }}>Нет аккаунта? <NavLink to={'/regist'} style={{
            color: "var(--text)", borderBottom: "1px solid var(--faint)"
        }}>Зарегистрироваться</NavLink></p>
    </div>
}

export default Login